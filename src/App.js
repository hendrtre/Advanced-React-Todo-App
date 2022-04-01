import React from 'react'
import { useEffect } from 'react'

function App() {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
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

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function removeTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

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
    <div class="wrapper">
        <header>Trents Advanced</header>
        <header>Todo List</header>

          <form class="inputField" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder='Enter a new task'  
              onChange={(e) => setTodo(e.target.value)}
              value={todo} 
            />
            <button type="submit"> <i class="fas fa-plus"></i> </button>
          </form>

        {/* <ul class="todoList">
          <li className='done'>Todo Item 1 (Done example)<span> <i class="fa fa-trash"></i></span></li>
          <li>Todo Item 2<span> <i class="fa fa-trash"></i></span></li>
        </ul> */}

        
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

      {/* <div class="footer">
        <span>You have 1 pending tasks.</span>
        <button>Clear Done</button>
      </div> */}
    </div>
  );
}

export default App;