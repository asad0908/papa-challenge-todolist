import React, { useEffect, useState } from "react";
import "../css/TodoContainer.css";
import TodoApp from "./TodoApp";

const TodoContainer = () => {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  useEffect(() => {
    const fetchQuotes = async () => {
      const response = await fetch("https://type.fit/api/quotes")
        .then((res) => res.json())
        .then((data) => {
          setQuotes(data);
          setSelectedQuote(data[Math.floor(Math.random() * data.length)]);
        });
    };

    fetchQuotes();
  }, []);

  const changeQuote = () => {
    setSelectedQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  return (
    <div className="todoContainer">
      <div onClick={changeQuote} className="todoContainer__quotes">
        <h1>{selectedQuote?.text}</h1>
        <h4>- {selectedQuote?.author}</h4>
      </div>
      <TodoApp />
    </div>
  );
};

export default TodoContainer;
