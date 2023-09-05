import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

export default function TodoList() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  function handleTodo() {
    const id = Date.now();
    setTodos((prev) => [
      ...prev,
      {
        id: id,
        task: todo,
        complete: false,
      },
    ]);
    setTodo("");
  }

  // To get the value
  function todoValue(e) {
    setTodo(e.target.value);
  }

  // To delete the todo
  function deleteTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  // To complete the task
  function selectTodo(selectedTodo) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === selectedTodo.id
          ? { ...todo, complete: !todo.complete }
          : todo
      )
    );
  }

  return (
    <div className="todo-box">
      <div className="box">
        <div className="input-sec">
          <input
            className="input-box"
            value={todo}
            onChange={todoValue}
            placeholder="Enter the todo....."
          ></input>
          <button className="add-button" onClick={handleTodo}>
            Add Todo
          </button>
        </div>
        <div className="todos-sec">
          <ul className="todos-list">
            {todos.map((todo) => (
              <li
                className={`todo-card ${todo.complete ? "completed" : ""}`}
                key={todo.id}
              >
                {todo.complete ? (
                  <s>{todo.task}</s>
                ) : (
                  <>
                    <input type="checkbox" onClick={() => selectTodo(todo)} />
                    {todo.task}
                  </>
                )}
                <div>
                  {todo.complete ? (
                    <FontAwesomeIcon
                      id="fa-icon"
                      onClick={() => deleteTodo(todo.id)}
                      icon={faTrash}
                    />
                  ) : (
                    <>
                      <FontAwesomeIcon
                        id="fa-icon"
                        onClick={() => deleteTodo(todo.id)}
                        icon={faTrash}
                      />
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
