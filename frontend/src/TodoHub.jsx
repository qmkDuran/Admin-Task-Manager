import React, { useState, useEffect } from "react"; // Import React, useState for state management, and useEffect for lifecycle methods.
import axios from "axios"; // Import axios for making HTTP requests.
import TodoForm from "./TodoForm"; // Import TodoForm component for creating new tasks.
import TodoList from "./TodoList"; // Import TodoList component for displaying in-progress tasks.
import TaskItem from "./TaskItem"; // Import TaskItem component for rendering individual tasks.
import Modal from "./Modal"; // Import Modal component for displaying modal windows.
import "./index.css"; // Import the CSS file to apply styles to this component.

function TodoHub() {
  // TodoHub is the main component that manages the state and behavior of the todo app.

  const [inProgressTasks, setInProgressTasks] = useState([]);
  // State to hold tasks that are currently in progress.

  const [doneTasks, setDoneTasks] = useState([]);
  // State to hold tasks that have been completed.

  const [editTask, setEditTask] = useState(null);
  // State to hold a task that is currently being edited.

  const [showModal, setShowModal] = useState(false);
  // State to control the visibility of the modal.

  const openModal = () => setShowModal(true);
  // Function to show the modal.

  const closeModal = () => setShowModal(false);
  // Function to hide the modal.

  // Fetch tasks based on their status when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const inProgressResponse = await axios.get(
          "http://localhost:3000/todos/in progress"
        );
        // Fetch tasks that are in progress from the server.

        const doneResponse = await axios.get(
          "http://localhost:3000/todos/done"
        );
        // Fetch tasks that are done from the server.

        setInProgressTasks(inProgressResponse.data);
        // Update the inProgressTasks state with the fetched data.

        setDoneTasks(doneResponse.data);
        // Update the doneTasks state with the fetched data.
      } catch (error) {
        console.error("Error fetching tasks:", error);
        // Log an error if the fetch request fails.
      }
    };

    fetchTasks();
    // Call the fetchTasks function when the component mounts.
  }, []);

  // Callback function to add new todos
  const addTodoCallback = (newTodo) => {
    setInProgressTasks([...inProgressTasks, newTodo]);
    // Add the new todo to the inProgressTasks state.
  };

  // Function to handle marking a task as done
  const handleDoneClick = async (taskId) => {
    try {
      await axios.patch(`http://localhost:3000/todos/${taskId}/status`, {
        status: "done",
      });
      // Send a PATCH request to update the task's status to "done".

      const doneTask = inProgressTasks.find((task) => task.id === taskId);
      // Find the task in the inProgressTasks state by its ID.

      if (!doneTask) {
        console.error("Task not found in inProgressTasks");
        return;
        // Log an error if the task is not found.
      }

      setInProgressTasks(inProgressTasks.filter((task) => task.id !== taskId));
      // Remove the task from the inProgressTasks state.

      setDoneTasks([...doneTasks, doneTask]);
      // Add the task to the doneTasks state.
    } catch (error) {
      console.error("Error updating task status:", error);
      // Log an error if the update request fails.
    }
  };

  // Function to handle undoing a task from done to in progress
  const handleUndoClick = async (taskId) => {
    try {
      await axios.patch(`http://localhost:3000/todos/${taskId}/status`, {
        status: "in progress",
      });
      // Send a PATCH request to update the task's status to "in progress".

      const undoTask = doneTasks.find((task) => task.id === taskId);
      // Find the task in the doneTasks state by its ID.

      if (!undoTask) {
        console.error("Task not found in doneTasks");
        return;
        // Log an error if the task is not found.
      }

      setDoneTasks(doneTasks.filter((task) => task.id !== taskId));
      // Remove the task from the doneTasks state.

      setInProgressTasks([...inProgressTasks, undoTask]);
      // Add the task back to the inProgressTasks state.
    } catch (error) {
      console.error("Error updating task status:", error);
      // Log an error if the update request fails.
    }
  };

  // Function to handle editing a task
  const handleEditClick = (taskId) => {
    const taskToEdit =
      inProgressTasks.find((task) => task.id === taskId) ||
      doneTasks.find((task) => task.id === taskId);
    // Find the task to edit from either the inProgressTasks or doneTasks state.

    if (taskToEdit) {
      setEditTask(taskToEdit);
      // Set the editTask state to the task that needs to be edited.

      // Optionally, you can trigger some UI changes to allow editing
    }
  };

  // Function to handle deleting a task
  const handleDeleteClick = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${taskId}`);
      // Send a DELETE request to remove the task from the server.

      setInProgressTasks(inProgressTasks.filter((task) => task.id !== taskId));
      // Remove the task from the inProgressTasks state.

      setDoneTasks(doneTasks.filter((task) => task.id !== taskId));
      // Remove the task from the doneTasks state.
    } catch (error) {
      console.error("Error deleting task:", error);
      // Log an error if the delete request fails.
    }
  };

  return (
    <>
      <div className="title-container">
        <h1 className="title">Admin Task Manager</h1>
        {/* Title of the application */}
      </div>
      <div className="todo-container">
        <div className="input-container">
          <h1>Enter Task</h1>
          <TodoForm addTodoCallback={addTodoCallback} editTask={editTask} />
          {/* Form for entering a new task, with a callback to add the task */}
        </div>
        <div className="list-container">
          <h1>Task List</h1>
          <TodoList
            todos={inProgressTasks}
            setTodos={setInProgressTasks}
            onDoneClick={handleDoneClick}
            onEditClick={handleEditClick} // Pass the edit handler
            onDeleteClick={handleDeleteClick} // Pass the delete handler
          />
          {/* List of tasks that are in progress */}
        </div>
        <div className="done-container">
          <h1>Done</h1>
          {doneTasks.length === 0 ? (
            <p>No tasks are completed yet.</p>
          ) : (
            // Display a message if no tasks are marked as done.
            <ul>
              {doneTasks.map((task) => (
                <li key={task.id}>
                  <TaskItem
                    task={task}
                    onUndoClick={handleUndoClick}
                    onEditClick={handleEditClick} // Pass the edit handler
                    onDeleteClick={handleDeleteClick} // Pass the delete handler
                  />
                  {/* Display each done task with options to undo, edit, or delete */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="todo-container">
        {/* Your existing task components */}
      </div>
      <button onClick={openModal} className="open-modal-btn">
        About Me
        {/* Button to open the "About Me" modal */}
      </button>

      <Modal show={showModal} handleClose={closeModal}>
        <h2>Michael Duran</h2>
        <p>
          💼 3+ Years at a Fortune 100 Company: I’ve been crafting and
          maintaining user interfaces at USAA (JavaScript, HTML, and CSS), where
          I’ve learned to handle big projects and deliver quality work in a
          fast-paced environment.
        </p>
        <p>
          👨‍💻 Self-Taught and Driven: I taught myself how to code while balancing
          a full-time job and family life. I’m all about the hustle and getting
          things done.
        </p>
        <p>
          🎓 Committed to Growth: I’ve earned frontend and backend certificates
          and am currently working on my Bachelor’s in Computer Science. I’ve
          also taken the initiative to learn React.js, Java, and SQL to expand
          my skills.
        </p>
        <p>
          👥 Leadership Experience in Customer Service: Before transitioning
          into tech, I managed a remote team of 14 in a contact center, which
          taught me how to handle responsibilities and deliver results under
          pressure.
        </p>
        <div className="linkedin">
          <p>
            Connect with me on{" "}
            <a
              href="https://www.linkedin.com/in/michael-duran-engineer/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
        </div>
        {/* Modal content with details about Michael Duran */}
      </Modal>
    </>
  );
}

export default TodoHub; // Export the TodoHub component so it can be used in other parts of the app.
