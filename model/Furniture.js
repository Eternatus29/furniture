const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const furnitureSchema = new Schema({
    furnitureName: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Furniture = mongoose.model('Furniture', furnitureSchema);

module.exports = Furniture;
