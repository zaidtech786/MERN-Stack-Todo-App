const express = require("express")
const app = express();
const cors=require('cors');
app.use(cors())
app.use(express.json());
const dotenv = require("dotenv")
dotenv.config();
const path = require("path")


// Static Files
app.use(express.static(path.join(__dirname,"../Frontend/todo_app/dist")))

app.get("*",function(req,res) {
res.sendFile(path.join(__dirname,"../Frontend/todo_app/dist/index.html"))
})

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


