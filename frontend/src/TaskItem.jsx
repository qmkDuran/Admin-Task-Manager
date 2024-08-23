import React from "react"; // Import the React library to use JSX and create components.
import "./index.css"; // Import the CSS file to apply styles to this component.

function TaskItem({ task, onDoneClick, onDeleteClick, onUndoClick }) {
  // TaskItem is a functional component that takes in four props:
  // - 'task': an object containing the task's details (title, description, priority, etc.).
  // - 'onDoneClick': a function to call when the task is marked as done.
  // - 'onDeleteClick': a function to call when the task is deleted.
  // - 'onUndoClick': a function to call when the task's done status is undone.

  return (
    <div>
      <h2>{task.title}</h2> 
      {/* Display the task's title in a header (h2) element. */}
      
      <p>Task: {task.description}</p>
      {/* Display the task's description in a paragraph (p) element. */}
      
      <p>Task Priority: {task.priority}</p>
      {/* Display the task's priority level in a paragraph (p) element. */}
      
      {task.imageData && (
        <div className="img-container">
          <img
            className="img-item"
            src={`data:image/jpeg;base64,${task.imageData}`}
            alt="Task"
          />
          {/* If 'task.imageData' exists, render an image.
              The image source is created from the base64 data stored in 'task.imageData'. 
              The 'alt' attribute is used for accessibility, describing the image as "Task". */}
        </div>
      )}
      
      <div className="task-btns-container">
        {/* Container for the task action buttons (Done, Undo, Delete). */}
        
        {onDoneClick && (
          <button onClick={() => onDoneClick(task.id)}>Done</button>
          /* If 'onDoneClick' is provided, render a "Done" button.
              When clicked, it triggers the 'onDoneClick' function with the task's ID. */
        )}
        
        {onUndoClick && (
          <button onClick={() => onUndoClick(task.id)}>Undo</button>
          /* If 'onUndoClick' is provided, render an "Undo" button.
              When clicked, it triggers the 'onUndoClick' function with the task's ID. */
        )}
        
        <button className="delete-btn" onClick={() => onDeleteClick(task.id)}>
          Delete
          {/* Render a "Delete" button that always shows.
              When clicked, it triggers the 'onDeleteClick' function with the task's ID. */}
        </button>
      </div>
    </div>
  );
}

export default TaskItem; // Export the TaskItem component so it can be used in other parts of the app.
