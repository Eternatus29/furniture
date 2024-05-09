const express = require("express")
const Furniture = require("../model/Furniture")
const isUserPresent = require("../middleware/auth")
const router = express.Router()

//Get all Furnitures
router.get("/furnitures", async (req, res) => {
    let furnitures = await Furniture.find()
    res.render("allFurnitures", { furnitures })
})

//Get 1 furniture
router.get("/furnitures/:id", isUserPresent, async (req, res) => {
    try {
        const furniture = await Furniture.findById(req.params.id);
        if (!furniture) {
            req.flash('error', 'Furniture not found!');
            return res.redirect("/furnitures");
        }
        res.render("furnitureDetails", { furniture });
    } catch (err) {
        console.error("Error fetching furniture details:", err);
        req.flash('error', 'Something went wrong!');
        res.redirect("/furnitures");
    }
});

//Add Furniture
router.get("/furniture/new", isUserPresent, (req, res) => {
    res.render("addFurniture")
})

router.post("/furniture/new", async (req, res) => {
    const { furnitureName, image, price } = req.body
    await Furniture.create({ furnitureName, image, price })
    req.flash('success', 'Furniture added successfully!')
    res.redirect("/furnitures")
})

//Update Furniture
router.get("/furnitures/:id/edit", isUserPresent, async (req, res) => {
    try {
        const furniture = await Furniture.findById(req.params.id);
        if (!furniture) {
            req.flash('error', 'Furniture not found!');
            return res.redirect("/furnitures");
        }
        res.render("editFurniture", { furniture });
    } catch (err) {
        console.error("Error fetching furniture:", err);
        req.flash('error', 'Something went wrong!');
        res.redirect("/furnitures");
    }
});

router.post("/furnitures/:id/edit", async (req, res) => {
    try {
        const { furnitureName, image, price } = req.body;
        await Furniture.findByIdAndUpdate(req.params.id, { furnitureName, image, price });
        req.flash('success', 'Furniture updated successfully!');
        res.redirect("/furnitures");
    } catch (err) {
        console.error("Error updating furniture:", err);
        req.flash('error', 'Failed to update furniture!');
        res.redirect("/furnitures");
    }
});

module.exports = router