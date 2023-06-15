const express = require("express")
const router = express.Router();
const {addTodo,updateTodo,deleteTodo,deleteAll,getAllTodo}= require("../Controllers/TodosController")

router.post("/addtodo",addTodo)
router.put("/updatetodo/:id",updateTodo)
router.delete("/deletetodo/:id",deleteTodo)
router.delete("/deletealltodo",deleteAll)
router.get("/gettodos",getAllTodo)

module.exports = router