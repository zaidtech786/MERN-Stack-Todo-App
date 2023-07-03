
import { useEffect } from "react";
import { BsPencilSquare, BsTrash3Fill } from "react-icons/bs";

const Tasks = (props) => {

  return (
    <>
         <div className="taskContainer" key={props.id} >
                   <div className="tasks">
                     <input type="checkbox" name="checkbox" id="0" checked={props.status==="completed" ? true : false} onChange={(e) => props.Completetask(props.id,e)} />
                     <div className="taskItem">
                     <p className="task" style={{textDecoration:props.status==="completed" ? "line-through" : ""}}>{props.title}</p>
                     <h6>{props.desc}</h6>
                     </div>
                   </div>
                   <div className="Icons">
                     <BsPencilSquare className="edit" onClick={() => props.EditTodo(props.id)} />
                    <BsTrash3Fill className="delete" onClick={() => props.deleteTodo(props.id)} />
                   </div>
                 </div>
    </>
  )
}

export default Tasks