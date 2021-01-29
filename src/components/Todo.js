import React, { forwardRef } from "react";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import EditIcon from "@material-ui/icons/Edit";

const Todo = forwardRef(({ todo, completeTodo, editTodo, deleteTodo }, ref) => {
  return (
    <div ref={ref} className="todoApp__todo">
      <div
        onClick={() => completeTodo(todo)}
        className={`todoApp__todo--details ${
          todo.completed ? "todo__completed" : ""
        }`}
      >
        <h1>{todo.todo}</h1>
        <p>{moment(todo.timestamp).fromNow()}</p>
      </div>
      <div className="todoApp__todo--controls">
        <EditIcon
          onClick={() => editTodo(todo)}
          style={{ fill: "darkblue", cursor: "pointer" }}
        />
        <DeleteIcon
          onClick={() => deleteTodo(todo.key)}
          style={{ fill: "darkblue", cursor: "pointer" }}
        />
        {todo.completed && (
          <DoneAllIcon style={{ fill: "green", cursor: "pointer" }} />
        )}
      </div>
    </div>
  );
});

export default Todo;
