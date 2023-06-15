const express = require("express")
const app = express();
const cors=require('cors');
app.use(cors())
app.use(express.json());
const dotenv = require("dotenv")
dotenv.config();

let port = process.env.PORT 

app.listen(port,() => {
    console.log("Server Started on port " +port )
});


// Database Connection
const {databaseConn} = require("./Database/Conn");
databaseConn(process.env.URI)

// Modals
const todoModal = require("./Modals/Todos.js")

// Importing Routes
const todosRoute = require("./Routes/TodoRoutes")
app.use("/todo",todosRoute)


