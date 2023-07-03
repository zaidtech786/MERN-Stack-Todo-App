import { useEffect, useState } from "react";
import "../Styles/Todo.css";
import axios from "axios"
import Tasks from "./Tasks";
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("");
  const [show,setShow]  = useState(false)
  const [isEditId,setIsEditId] = useState("")
  const [active,setActive] = useState("All")

  const getTodos = () => {
    axios.get("http://localhost:4000/todo/gettodos")
    .then(res => {
      console.log(res.data);
      setTodos(res.data.todo)
    })
    .catch(err => {
      console.log(err);
    })
  }
 
  useEffect( () => {
    getTodos()
  },[])

  const handleClick = () => {
    if(!title && !desc){
      return alert("Please Fill the details")
    }
    else if(title && desc && show){
      axios.put(`http://localhost:4000/todo/updatetodo/${isEditId}`,{
        title,
        desc
      }).then(res => {
        console.log(res.data);
        setTodos(
          todos.map(todo => {
            if(todo._id===isEditId){
              return {...todo,title:res.data.todo.title,desc:res.data.todo.desc}
            }
            return todo
          })
        )
      }).catch(err => {
        console.log(err);
      })
      setTitle("")
      setDesc("")
      setIsEditId(null)
      setShow(false)
    }
    else{
       axios.post("http://localhost:4000/todo/addtodo",{
        title,
        desc
       }).then(res => {
        console.log(res.data);
        setTodos([...todos,res.data.todos])
      }) .catch(err => {
        console.log(err);
      })
      setTitle("")
      setDesc("")
    }

  }

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:4000/todo/deletetodo/${id}`)
    .then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
     const filterTodo = todos.filter(todo => {
       return todo._id !== id
     });
     setTodos(filterTodo)
  }

  const Completetask = (id,e) => {
    console.log(e.target.checked);
    if(e.target.checked){
      axios.put(`http://localhost:4000/todo/updatetodo/${id}`,{
        status:"completed"
      }).then(res => {
        console.log(res.data);
         setTodos(
          todos.map(item => {
            if(item._id===id){
              return {...item,status:res.data.todo.status};
            }
            return item
          })
         )
       
      }).catch(err => {
        console.log(err);
      });
    }
    else{
      axios.put(`http://localhost:4000/todo/updatetodo/${id}`,{
        status:"pending"
      }).then(res => {
        console.log(res.data);
         setTodos(
          todos.map(item => {
            if(item._id===id){
              return {...item,status:res.data.todo.status};
            }
            return item
          })
         )
       
      }).catch(err => {
        console.log(err);
      });
    }
   
  }

  const clearAll = () => {
    axios.delete("http://localhost:4000/todo/deletealltodo")
    .then(res => {
      setTodos([])
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  }


  const EditTodo = (id) => {
    // axios.put(`http://localhost:4000/todo/updatetodo/${id}`)
    let findItem = todos.find(todo => {
       return todo._id===id
    })
    setTitle(findItem?.title)
    setDesc(findItem?.desc)
    setShow(true)
    setIsEditId(id)
  }

  const showData = (data) => {
    setActive(data);
    let filterData = todos.filter(todo => {
       return todo.status===data
       
    });
    if(filterData){
      setTodos(filterData)
    }
    else{
       return alert("Not Completed any task")
    }
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="inputContainer">
          <div className="inputBox">
          <label>Title</label>
        <input type="text" placeholder="Enter Title..." id="title" value={title} className="input" onChange={(e)=>setTitle(e.target.value)} />
          </div>
          <div className="inputBox">
          <label>Description</label>
        <input type="text" placeholder="Enter Desc..." className="input" value={desc} id="desc" onChange={(e)=>setDesc(e.target.value)} />
          </div>
      
      {
        show 
        ? 
        <button onClick={handleClick} className="btnAdd">Edit</button>
        :
        <button onClick={handleClick} className="btnAdd">Add</button>
      }
        </div>

        <div className="btnContainer">
          <span className="all active" style={{color:active==="All" ? "#2a72c5" : "" }} onClick={() => {getTodos(),showData("All")}}>All</span>
          {/* <span className="pending" style={{color:active==="Pending" ? "#2a72c5" : "" }} onClick={()=>showData("pending")}>Pending</span> */}
          <span className="completed" style={{color:active==="completed" ? "#2a72c5" : "" }} onClick={()=>showData("completed")}>Completed</span>
          <button className="btn" onClick={clearAll}>Clear All</button>
        </div>

        <div className="taskWrapper">
          {todos?.map((todo) => {
            const {_id,title,desc,status} = todo
            return <Tasks id={_id} title={title} desc={desc} status={status} EditTodo={EditTodo} deleteTodo={deleteTodo} Completetask={Completetask} />
              
              // <>
              //   <div className="taskContainer" key={todo?._id} >
              //     <div className="tasks">
              //       <input type="checkbox" name="checkbox" id="0" onChange={(e) => Completetask(todo?._id,e)} />
              //       <div className="taskItem">
              //       <p className="task" style={{textDecoration:todo?.status ? "line-through" : ""}}>{todo?.title}</p>
              //       <h6>{todo?.desc}</h6>
              //       </div>
              //     </div>
              //     <div className="Icons">
              //       <BsPencilSquare className="edit" onClick={() => EditTodo(todo?._id)} />
              //       <BsTrash3Fill className="delete" onClick={() => deleteTodo(todo?._id)} />
              //     </div>
              //   </div>
              // </>
          
          })}
        </div>
      </div>
    </div>
  );
};

export default Todo;
