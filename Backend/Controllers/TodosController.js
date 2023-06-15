const todoModal = require("../Modals/Todos");


const addTodo = async(req,res) => {
    const {title,desc} = req.body;
    if(!title && !desc){
       return res.send({err : "Please fill all the credentials"})
    }
    let todos = new todoModal({
        title,
        desc,
    })
    try{
        todos.save()
    }
    catch(err){
        console.log(err);
    }
    res.send({todos})
}

const updateTodo = async(req,res) => {
    let {id} = req.params;
    let todo;
    try {
        todo = await todoModal.findByIdAndUpdate(id,{
            $set:req.body
        },{
            new:true
        })
    } catch (error) {
        console.log(error);
    }
    if(todo){
        return res.send({msg:"Todo Updated Successfully",todo})
    }
    return res.send({msg:"Something went Wrong"})
}

const deleteTodo = async(req,res) => {
    let todo;
    try {
        todo = await todoModal.findByIdAndRemove(req.params.id)
    } catch (error) {
        console.log(error);
    }
    if(todo){
       return res.send({msg:"Todo Deleted Successfully"})
    }
    return res.send({msg:"Something went Wrong"})
}

const deleteAll = async(req,res) => {
let todo;
try {
    todo = await todoModal.deleteMany({})
} catch (error) {
    console.log(error);
}
if(todo){
    return res.send({msg:"All todos deleted Successfully"})
}
else{
    return res.send({err:"Something went Wrong"})
}
}

const getAllTodo = async(req,res) => {
    let todo;
    try {
        todo = await todoModal.find({})
    } catch (error) {
        console.log(error);
    }
    if(todo){
        return res.send({todo})
     }
     return res.send({msg:"Something went Wrong"})
}




exports.addTodo = addTodo
exports.updateTodo = updateTodo
exports.deleteTodo = deleteTodo
exports.deleteAll = deleteAll
exports.getAllTodo = getAllTodo