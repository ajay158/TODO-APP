import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';

const baseUrl = 'http://localhost/react_todo/';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(baseUrl + 'getTodos.php');
      const data = await response.json();
      console.log(data);
      setTodos(data.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    const formData = new FormData();
    formData.append('todo', todo);

    const response = await fetch(baseUrl + 'addTodo.php', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    if (result.success) {
      fetchTodos();
    }
  };

  const deleteTodo = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    const response = await fetch(baseUrl + 'deleteTodo.php', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    if (result.success) {
      fetchTodos();
    }
  };

  const editTodo = async (id, todo) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('todo', todo);

    const response = await fetch(baseUrl + 'editTodo.php', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    if (result.success) {
      fetchTodos();
    }
  };

  const handleAdd = () => {
    if (todo.trim()) {
      if (isEditing) {
        const id = todos[currentTodoIndex].id;
        editTodo(id, todo);
        setIsEditing(false);
        setCurrentTodoIndex(null);
      } else {
        addTodo();
      }
      setTodo('');
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const toggleComplete = async (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
    setTodos(updatedTodos);
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setCurrentTodoIndex(index);
    setTodo(todos[index].todo);
  };

  const handleDelete = (index) => {
    const id = todos[index].id;
    deleteTodo(id);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-blue-100 min-h-[80vh] w-1/2">
        <div className="addTodo my-4 flex flex-col gap-4">
          <h2 className="text-2xl font-bold my-1">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-lg px-3 py-2 mx-2"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-800 hover:bg-blue-900 p-2 py-1 text-sm font-bold text-white rounded-md"
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="ms-5">No Todos here!</div>}
          {todos.map((item, index) => (
            <div key={index} className="todo flex md:w-2/3 my-3 justify-between">
              <div className="flex gap-5">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => toggleComplete(index)}
                />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-blue-800 hover:bg-blue-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-blue-800 hover:bg-blue-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
