const express= require('express');
require('dotenv').config();
const { connection } = require('./database/db');
const { UserRouter } = require('./routes/user.route');
const { BookRouter } = require('./routes/Book.route');
const server=express()
server.use(express.json())

server.get("/",(req,res)=>{
    res.send("Welcome to Library app")
})


server.use("/users",UserRouter)
server.use("/library",BookRouter)

server.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error.message)
    }
    console.log("Connected to server")
})