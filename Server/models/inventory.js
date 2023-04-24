import mongoose from "mongoose";

// creating a schema to store inventory data in database
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    }
})

export const Inventory = mongoose.model('Inventory', schema);