import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import cors from 'cors'
import { config } from 'dotenv'
import { Server } from 'socket.io'
import inventoryRouter from './routes/inventory.js'


//creates a new instance of an Express application
const app = express();

//setting up config.env file so that we can use content of it
config({
    path: "./config.env"
})

//-------------------------------------------------------->
//connecting with mongoDB database, connecting app with database,
// 1.We enter URI of DB, then options,i.e., dbName
// 2.It will return a promise 
export const connectMongoDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Inventory-backend",
    }).then(() => {
        console.log("Database is connected!")
    }).catch((e) => console.log(e));
}

connectMongoDB();
//--------------------------------------------------------->

//using middlewares
app.use(cors());
//we are sending json data, that's why it is required to use the middleware, we have to use it before using router
//otherwise json data will not be send and it will not work
app.use(express.json());

//sharing router we are doing route-splitting, basically '/api/v1' will be a part of each route
app.use('/api/v1', inventoryRouter);

//creates a new instance of an HTTP server
const server = http.createServer(app)

//creates a new instance of the Socket.IO server
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
})

// initialize socket.io connecttion
io.on("connection", (socket)=>{
    console.log("User is connected!");

    // this custom event is to receive data from server and next custom event is to send data to client
    socket.on("send_to_server", (data)=>{
        socket.broadcast.emit("message_from_server", data)
    })

    socket.on("disconnect", ()=>{
        console.log("User Disconnected!")
    })
})


// setting up/starting server
server.listen(process.env.PORT, () => {
    console.log(`Server is working on Port ${process.env.PORT} in ${process.env.NODE_ENV} Mode.`);
})