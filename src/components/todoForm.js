// import react, { Component } from 'react'
import react from 'react'
import { useEffect, useState } from 'react' 


// export default class TodoForm extends Component {
function TodoForm() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");
    const [todoEditing, setTodoEditing] = useState(null);
    const [editingText, setEditingText] = useState("");
  
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
    // render() {
        return (
          <form class="inputField" onSubmit={handleSubmit}>
            <input 
              value={todo}
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Enter task..."
            />
            <button type='submit'> <i class="fas fa-plus"></i> </button>
          </form>
            // <div>
            //     <h1>Test</h1>
            //     <form class="inputField" onSubmit={handleSubmit}>
            //         <input
            //         type="text"
            //         placeholder='Enter a new task'  
            //         onChange={(e) => setTodo(e.target.value)}
            //         value={todo} 
            //         />
            //         <button type="submit"> <i class="fas fa-plus"></i> </button>
            //     </form>

            // </div>            
        )
    // }
};

export default TodoForm;