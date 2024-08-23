import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function Todo() {
  // State for storing the list of todos
  const [todos, setTodos] = useState([]);
  // State for storing the form input for new todo
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "Normal",
    file: null,
  });
  // State for tracking the currently edited todo index
  const [editIndex, setEditIndex] = useState(-1);
  // State for storing the form input for edited todo
  const [editTodo, setEditTodo] = useState({
    title: "",
    description: "",
    priority: "Normal",
    file: null,
  });

  // Effect hook for fetching todos from the server when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  useEffect(() => {
    console.log("Updated editTodo state:", editTodo);
  }, [editTodo]);

  // Handler for checkbox change to toggle completion status of a todo
  const handleCheckboxChange = (index) => {
    const updatedTodos = todos.map((todo, idx) => {
      if (idx === index) {
        return { ...todo, isDone: !todo.isDone }; // Toggle the 'isDone' property
      }
      return todo;
    });
    setTodos(updatedTodos);

    axios
      .put(`http://localhost:3000/todos/${todos[index].id}`, {
        title: todos[index].title,
        description: todos[index].description,
        priority: todos[index].priority,
        isDone: !todos[index].isDone, // Send the updated isDone status
      })
      .then(() => {
        console.log("Update successful");
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  // Start editing a todo
  const startEdit = (index) => {
    setEditIndex(index);
    setEditTodo({
      title: todos[index].title,
      description: todos[index].description,
      priority: todos[index].priority,
      file: null, // Initialize file as null
    });
  };

  // Handle form inputs during edit
  const handleEditChange = (name, value) => {
    setEditTodo((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited todo
  const saveTodo = (index) => {
    const formData = new FormData();
    formData.append("title", editTodo.title);
    formData.append("description", editTodo.description);
    formData.append("priority", editTodo.priority);
    if (editTodo.file) {
      formData.append("file", editTodo.file);
    }

    axios
      .put(`http://localhost:3000/todos/${todos[index].id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const updatedTodos = [...todos];
        updatedTodos[index] = {
          ...updatedTodos[index],
          ...editTodo,
          imageData: response.data.imageData // Use the new image data from the response
            ? response.data.imageData
            : updatedTodos[index].imageData,
        };
        setTodos(updatedTodos);
        setEditIndex(-1); // Reset edit index after save
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  // Add new todo
  const addTodo = () => {
    const formData = new FormData();
    formData.append("title", newTodo.title);
    formData.append("description", newTodo.description);
    formData.append("priority", newTodo.priority);
    if (newTodo.file) {
      formData.append("file", newTodo.file);
    }

    axios
      .post("http://localhost:3000/todos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setTodos([...todos, response.data]); // Append the new todo
        setNewTodo({
          title: "",
          description: "",
          priority: "Normal",
          file: null,
        }); // Reset the form
      })
      .catch((error) => console.error("Error adding new todo:", error));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/todos/${todos[id].id}`)
      .then(() => {
        setTodos(todos.filter((_, index) => index !== id)); // Remove todo from list
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    setEditTodo((prev) => ({ ...prev, file: file }));
  };

  const handleNewFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    setNewTodo((prev) => ({ ...prev, file: file }));
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div>
        <h2>Add New Todo</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <select
          value={newTodo.priority}
          onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
        <div className="upload-btn">
          <input type="file" onChange={handleNewFileChange} />
        </div>
        <button className="add-btn" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.isDone ? "isDone" : ""}>
            {editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editTodo.title}
                  onChange={(e) => handleEditChange("title", e.target.value)}
                />
                <input
                  type="text"
                  value={editTodo.description}
                  onChange={(e) =>
                    handleEditChange("description", e.target.value)
                  }
                />
                <select
                  value={editTodo.priority}
                  onChange={(e) => handleEditChange("priority", e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
                <div className="upload-btn">
                  <input type="file" onChange={handleFileChange} />
                </div>
                <button className="save-btn" onClick={() => saveTodo(index)}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                <div>
                  <div>
                    <h2>{todo.title}</h2>
                  </div>
                  <div>
                    <p>Task: {todo.description}</p>
                  </div>
                  <div>
                    <p>Task Priority: {todo.priority}</p>
                  </div>
                  {todo.imageData && (
                    <div className="img-container">
                      <img
                        className="img-item"
                        src={`data:image/jpeg;base64,${todo.imageData}`}
                        alt="Todo"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <button onClick={() => handleCheckboxChange(index)}>
                    {todo.isDone ? "Undo" : "Done"}
                  </button>
                  <button className="edit-btn" onClick={() => startEdit(index)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
