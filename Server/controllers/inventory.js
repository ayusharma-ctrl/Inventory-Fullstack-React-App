import { Inventory } from "../models/inventory.js";


// show all items of inventory
export const allItems = async (req, res) => {
    try {
        const items = await Inventory.find()
        res.status(200).json({
            success: true,
            message: "All items",
            items
        })
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
}


// add a new item to inventory
export const addItem = async (req, res) => {
    try {
        const { name, quantity } = req.body
        await Inventory.create({ name, quantity })
        res.status(201).json({ success: true, message: "Item Added to Inventory" })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//show item details by passing id
export const itemDetails = async (req, res) => {
    try {
        const { id } = req.params
        const item = await Inventory.findById(id)
        if (!item) {
            return res.status(404).json({ success: false, message: "No item found!" })
        }
        res.status(200).json({ success: true, message: "Item Details", item })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//update item by passing id
export const updateItem = async (req, res) => {
    try {
        const { id } = req.params
        const item = await Inventory.findById(id)
        if (!item) {
            return res.status(404).json({ success: false, message: "No item found!" })
        }
        const {name, quantity} = req.body;
        item.name = name;
        item.quantity = quantity;
        await item.save()
        res.status(200).json({ success: true, message: "Item Details Updated", item })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//delete an item by passing id
export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params
        const item = await Inventory.findById(id)
        if (!item) {
            return res.status(404).json({ success: false, message: "No item found!" })
        }
        await item.deleteOne();
        res.status(200).json({ success: true, message: "Item Deleted" })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}