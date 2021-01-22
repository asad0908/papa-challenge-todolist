import React, { useEffect, useState } from "react";
import "../css/TodoApp.css";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import uuid from "react-uuid";
import moment from "moment";
import FlipMove from "react-flip-move";

const TodoApp = () => {
  const [todo, setTodo] = useState("");
  const [todoValid, setTodoValid] = useState(false);
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editableIndex, setEditableIndex] = useState(null);

  const saveTodos = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);

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

      if (!editing) {
        let newTodos = [newTodo, ...todos];
        setTodos(newTodos);
        setTodo("");
        saveTodos(newTodos);
      } else {
        const editableTodo = todos;
        editableTodo[editableIndex] = newTodo;
        setTodos(editableTodo);
        setTodo("");
        saveTodos(editableTodo);
        setEditableIndex(null);
        setEditing(false);
      }
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      submitTodo();
    }
  };

  const deleteTodo = (key) => {
    let newTodos = todos.filter((todo) => todo.key !== key);
    setTodos(newTodos);
    saveTodos(newTodos);
    setTodo("");
  };

  const editTodo = (todo) => {
    setTodo(todo.todo);
    const filteredIndex = todos.findIndex((tod) => tod.key === todo.key);
    setEditing(true);
    setEditableIndex(filteredIndex);
  };

  const completeTodo = (todo) => {
    const filteredIndex = todos.findIndex((tod) => tod.key === todo.key);
    const getAll = JSON.parse(localStorage.getItem("todos"));

    if (todo.completed) {
      //make todo undone
      getAll[filteredIndex].completed = false;
    } else {
      //make todo done
      getAll[filteredIndex].completed = true;
    }
    saveTodos(getAll);
    setTodos(getAll);
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
        {editing ? (
          <EditIcon onClick={submitTodo} style={{ cursor: "pointer" }} />
        ) : (
          <AddIcon onClick={submitTodo} style={{ cursor: "pointer" }} />
        )}
      </div>
      <div className="todoApp__todos">
        <FlipMove typeName={null}>
          {todos.length !== 0 ? (
            todos.map((todo) => (
              <div key={todo.key} className="todoApp__todo">
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
            ))
          ) : (
            <h1 className="noTodo">Add some todos & start hustling!</h1>
          )}
        </FlipMove>
      </div>
    </div>
  );
};

export default TodoApp;
