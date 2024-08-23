import React, { useState } from "react"; // Import React and useState for managing component state.
import axios from "axios"; // Import axios for making HTTP requests.
import "./index.css"; // Import the CSS file to apply styles to this component.

function TodoForm({ addTodoCallback }) {
  // TodoForm is a functional component that takes in one prop:
  // - 'addTodoCallback': a function that gets called when a new todo is successfully added.

  const [newTodo, setNewTodo] = useState({
    // Initialize the state 'newTodo' with default values for the form fields.
    title: "", // Title of the new todo, initially empty.
    description: "", // Description of the new todo, initially empty.
    priority: "Normal", // Priority of the new todo, defaulted to "Normal".
    file: null, // File associated with the new todo, initially null (no file).
  });

  const handleNewFileChange = (e) => {
    // This function handles changes to the file input.
    const file = e.target.files[0]; // Get the first file selected by the user.
    setNewTodo((prev) => ({ ...prev, file: file }));
    // Update the 'file' field in the 'newTodo' state with the selected file.
  };

  const addTodo = () => {
    // This function is called when the user clicks the "Add" button to submit the form.

    const formData = new FormData();
    // Create a new FormData object to hold the form data, including the file upload.
    formData.append("title", newTodo.title); // Add the title to the form data.
    formData.append("description", newTodo.description); // Add the description to the form data.
    formData.append("priority", newTodo.priority); // Add the priority to the form data.
    formData.append("status", "in progress"); // Set the initial status of the todo as 'in progress'.
    if (newTodo.file) {
      formData.append("file", newTodo.file); // If a file is selected, add it to the form data.
    }

    axios
      .post("http://localhost:3000/todos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      // Send a POST request to the server to add the new todo.
      // The server expects a multipart/form-data request, which is handled by the FormData object.
      .then((response) => {
        addTodoCallback(response.data);
        // If the request is successful, call 'addTodoCallback' with the new todo data.
        setNewTodo({
          // Reset the form fields to their initial values.
          title: "",
          description: "",
          priority: "Normal",
          file: null,
        });
      })
      .catch((error) => console.error("Error adding new todo:", error));
    // If there's an error, log it to the console.
  };

  return (
    <div>
      {/* Form for entering a new todo task. */}
      <input
        type="text"
        placeholder="Title"
        value={newTodo.title}
        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
      />
      {/* Input field for the title of the todo. */}

      <input
        type="text"
        placeholder="Description"
        value={newTodo.description}
        onChange={(e) =>
          setNewTodo({ ...newTodo, description: e.target.value })
        }
      />
      {/* Input field for the description of the todo. */}

      <select
        value={newTodo.priority}
        onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
      >
        {/* Dropdown to select the priority level of the todo. */}
        <option value="Low">Low</option>
        <option value="Normal">Normal</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>
      </select>

      <div className="upload-btn">
        <input type="file" onChange={handleNewFileChange} />
        {/* Input field for uploading a file associated with the todo. */}
      </div>

      <button className="add-btn" onClick={addTodo}>
        Add
      </button>
      {/* Button to submit the form and add the new todo. */}
    </div>
  );
}

export default TodoForm; // Export the TodoForm component so it can be used in other parts of the app.
