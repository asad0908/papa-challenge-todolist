import React, { useEffect, useState } from "react";
import "../css/TodoApp.css";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DeleteIcon from "@material-ui/icons/Delete";
import uuid from "react-uuid";

const TodoApp = () => {
  const [todo, setTodo] = useState("");
  const [todoValid, setTodoValid] = useState(false);
  const [prevTodos, setPrevTodos] = useState(
    localStorage.getItem("todos") !== null
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const handleTodoInput = (e) => {
    if (todo.length > 2) {
      setTodoValid(true);
    } else {
      setTodoValid(false);
    }
    setTodo(e.target.value);
  };

  const submitTodo = () => {
    if (todoValid) {
      const date = new Date();
      const newTodo = {
        key: uuid(),
        todo: todo.charAt(0).toUpperCase() + todo.slice(1),
        timestamp: date.getTime(),
        completed: false,
      };

      const allTodos = [newTodo].concat(prevTodos);

      setPrevTodos(allTodos);
      localStorage.setItem("todos", JSON.stringify(allTodos));

      setTodo("");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      submitTodo();
    }
  };

  const deleteTodo = (key) => {
    const prevArray = JSON.parse(localStorage.getItem("todos"));
    const filteredArray = prevArray.filter((todo) => todo.key !== key);
    setPrevTodos(filteredArray);
    localStorage.setItem("todos", JSON.stringify(filteredArray));
  };

  const todoDone = (todos) => {
    // const index = prevTodos.findIndex((todo) => todo.key === todos.key);
    // const completedTodo = todos;
    // completedTodo.completed = true;
    // prevTodos[index] = completedTodo;
    // localStorage.setItem("todos", JSON.stringify(prevTodos));
  };

  return (
    <div className="todoApp">
      <div className="todoApp__searchContainer">
        <input
          onKeyDown={handleEnter}
          value={todo}
          onChange={handleTodoInput}
          type="text"
          placeholder="Enter a todo"
        />
        <AddIcon onClick={submitTodo} style={{ cursor: "pointer" }} />
      </div>
      <div className="todoApp__todos">
        {prevTodos.length !== 0 ? (
          prevTodos.map((todos) => (
            <div
              onClick={() => todoDone(todos)}
              key={todos.key}
              className="todoApp__todo"
            >
              <div className="todoApp__todo--details">
                <h1>{todos.todo}</h1>
                <p>{todos.timestamp}</p>
              </div>
              <div className="todoApp__todo--controls">
                <EditIcon style={{ fill: "darkblue", cursor: "pointer" }} />
                <DeleteIcon
                  onClick={() => deleteTodo(todos.key)}
                  style={{ fill: "darkblue", cursor: "pointer" }}
                />
              </div>
            </div>
          ))
        ) : (
          <h1>Add some todos & start hustling!</h1>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
