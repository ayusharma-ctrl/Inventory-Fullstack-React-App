import express from 'express'
import { addItem, allItems, deleteItem, itemDetails, updateItem } from '../controllers/inventory.js';


//creating a router
const router = express.Router();

//api to get all the items of an inventory
router.get('/inventory', allItems)
//api to add a new item to inventory
router.post('/inventory', addItem)
//apis to get, update & delete an item by it's id, that's why id is dynamic
router.route("/inventory/:id").get(itemDetails).put(updateItem).delete(deleteItem)


export default router;