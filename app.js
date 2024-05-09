const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('hbs');
const flash = require('connect-flash');
const passport = require('passport');
const User = require('./model/User');

const app = express();

const MONGODB_URI = 'mongodb://localhost:27017/furnitures';
const PORT = 3000;

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

store.on('error', function(error) {
    console.error(error);
});

mongoose.connect(MONGODB_URI).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error', err);
});

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', require('./routes/furniture'));
app.use('/', require('./routes/user'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
