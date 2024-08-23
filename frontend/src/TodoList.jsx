import React, { useState } from "react"; // Import React and useState for managing component state.
import "./index.css"; // Import the CSS file to apply styles to this component.
import axios from "axios"; // Import axios for making HTTP requests.

function TodoList({ todos, setTodos, onDoneClick }) {
  // TodoList is a functional component that takes in three props:
  // - 'todos': an array of todo tasks to display.
  // - 'setTodos': a function to update the state of the todos.
  // - 'onDoneClick': a function to call when a todo is marked as done.

  const [editIndex, setEditIndex] = useState(-1);
  // State to track the index of the todo currently being edited (-1 means no todo is being edited).

  const [editTodo, setEditTodo] = useState({
    // State to hold the values of the todo being edited.
    title: "",
    description: "",
    priority: "Normal",
    file: null,
  });

  const startEdit = (index) => {
    // Function to start editing a todo.
    setEditIndex(index);
    // Set the 'editIndex' to the index of the todo being edited.

    setEditTodo({
      title: todos[index].title,
      description: todos[index].description,
      priority: todos[index].priority,
      file: null, // Initialize file as null (no file selected yet).
    });
  };

  const handleEditChange = (name, value) => {
    // Function to handle changes to the edit form fields.
    setEditTodo((prev) => ({ ...prev, [name]: value }));
    // Update the 'editTodo' state with the new value.
  };

  const saveTodo = async (index) => {
    // Function to save the edited todo.
    const formData = new FormData();
    // Create a new FormData object to hold the edited todo data.

    formData.append("title", editTodo.title); // Add the edited title.
    formData.append("description", editTodo.description); // Add the edited description.
    formData.append("priority", editTodo.priority); // Add the edited priority.
    if (editTodo.file) {
      formData.append("file", editTodo.file); // If a file is selected, add it to the form data.
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/todos/${todos[index].id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Send a PUT request to update the todo on the server with the new data.

      const updatedTodos = [...todos];
      console.log("Response from backend:", response.data);

      updatedTodos[index] = {
        ...updatedTodos[index],
        ...editTodo,
        imageData: response.data.imageData
          ? response.data.imageData
          : updatedTodos[index].imageData,
        // Update the todo with the new data, keeping the old imageData if no new image was uploaded.
      };

      console.log("Updated todos:", updatedTodos);

      setTodos(updatedTodos); // Update the state with the new todo data.
      setEditIndex(-1); // Reset edit index after save (no todo being edited).
    } catch (error) {
      console.error("Error updating todo:", error);
      // Log an error if the update request fails.
    }
  };

  const deleteTodo = async (index) => {
    // Function to delete a todo.
    try {
      await axios.delete(`http://localhost:3000/todos/${todos[index].id}`);
      // Send a DELETE request to remove the todo from the server.

      setTodos(todos.filter((_, idx) => idx !== index)); // Remove the todo from the state.
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Log an error if the delete request fails.
    }
  };

  const handleFileChange = (e) => {
    // Function to handle changes to the file input.
    const file = e.target.files[0];
    setEditTodo((prev) => ({ ...prev, file: file }));
    // Update the 'file' field in the 'editTodo' state with the selected file.
  };

  return (
    <div>
      {todos.length === 0 ? (
        <p>No tasks are currently in progress.</p>
      ) : (
        // Display a message if there are no todos in the list.
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className={todo.isDone ? "isDone" : ""}>
              {/* Render each todo as a list item. Apply a class if the todo is marked as done. */}

              {editIndex === index ? (
                <div>
                  {/* If the current todo is being edited, render the edit form. */}
                  <input
                    type="text"
                    value={editTodo.title}
                    onChange={(e) => handleEditChange("title", e.target.value)}
                    // Input for editing the title.
                  />
                  <input
                    type="text"
                    value={editTodo.description}
                    onChange={(e) =>
                      handleEditChange("description", e.target.value)
                    }
                    // Input for editing the description.
                  />
                  <select
                    value={editTodo.priority}
                    onChange={(e) =>
                      handleEditChange("priority", e.target.value)
                    }
                    // Dropdown for editing the priority.
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                  <div className="upload-btn">
                    <input type="file" onChange={handleFileChange} />
                    {/* Input for uploading a new file for the todo. */}
                  </div>
                  <button className="save-btn" onClick={() => saveTodo(index)}>
                    Save
                    {/* Button to save the edited todo. */}
                  </button>
                </div>
              ) : (
                <div>
                  {/* If the current todo is not being edited, display its details. */}
                  <div>
                    <div>
                      <h2>{todo.title}</h2>
                      {/* Display the title of the todo. */}
                    </div>
                    <div>
                      <p>Task: {todo.description}</p>
                      {/* Display the description of the todo. */}
                    </div>
                    <div>
                      <p>Task Priority: {todo.priority}</p>
                      {/* Display the priority of the todo. */}
                    </div>
                    {todo.imageData && (
                      <div className="img-container">
                        <img
                          className="img-item"
                          src={`data:image/jpeg;base64,${todo.imageData}`}
                          alt="Todo"
                          // If the todo has an image, display it.
                        />
                      </div>
                    )}
                  </div>
                  <div className="task-btns-container">
                    <button onClick={() => onDoneClick(todo.id)}>Done</button>
                    {/* Button to mark the todo as done. */}
                    <button
                      className="edit-btn"
                      onClick={() => startEdit(index)}
                    >
                      Edit
                      {/* Button to start editing the todo. */}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTodo(index)}
                    >
                      Delete
                      {/* Button to delete the todo. */}
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList; // Export the TodoList component so it can be used in other parts of the app.
