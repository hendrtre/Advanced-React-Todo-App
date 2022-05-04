import React from "react";
import { useEffect, useState } from 'react' 


function TodoList() {
    const [todos, setTodos] = useState([]);
    // const [todo, setTodo] = React.useState("");
    const [todoEditing, setTodoEditing] = React.useState(null);
    const [editingText, setEditingText] = React.useState("");
  
    useEffect(() => {
      const json = localStorage.getItem("todos");
      const loadedTodos = JSON.parse(json);
      if (loadedTodos) {
        setTodos(loadedTodos);
      }
    }, []);
  
    useEffect(() => {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }, [todos]);
  
    // function handleSubmit(e) {
    //   e.preventDefault();
  
    //   const newTodo = {
    //     id: new Date().getTime(),
    //     text: todo,
    //     completed: false,
    //   };
    //   setTodos([...todos].concat(newTodo));
    //   setTodo("");
    // }
  
    function removeTodo(id) {
      let updatedTodos = [...todos].filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
  
    // function removeAllTodos(completed) {
    //   let updatedTodos = [...todos].filter((todo) => todo.completed )
    // }
  
    function toggleComplete(id) {
      let updatedTodos = [...todos].map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
  
    function submitEdits(id) {
      const updatedTodos = [...todos].map((todo) => {
        if (todo.id === id) {
          todo.text = editingText;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    }

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id} className="todo">
                  <div className="todo-text">
                    <input
                      type="checkbox"
                      id="completed"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                    />
                    {todo.id === todoEditing ? (
                      <input
                        type="text"
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                    ) : (
                      <div>{todo.text}</div>
                    )}
                  </div>
        
                  <div className="todo-actions">
                    {todo.id === todoEditing ? (
                      <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                    ) : (
                      <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                    )}
        
                    <button onClick={() => removeTodo(todo.id)}>Delete</button>
                  </div>
                </div>
              ))}
        </div>
    )
}
 export default TodoList