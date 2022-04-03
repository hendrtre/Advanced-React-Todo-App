import { useState } from 'react' 

function ClearTodos() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");

    function removeTodo(id) {
        let updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    return (
      <div class="footer">
        {/* <span>You have 1 pending tasks.</span> */}
        <button onClick={() => removeTodo(...todo.id)}>Clear</button>

        {/* <button>Clear</button> */}
      </div>
    )
}

export default ClearTodos