import React from "react"; // Import the React library to use JSX and create components.
import TaskItem from "./TaskItem"; // Import the TaskItem component to render individual tasks.
import "./index.css"; // Import the CSS file to apply styles to this component.

function TodoDone({ doneTasks, onUndoClick }) {
  // TodoDone is a functional component that takes in two props:
  // - 'doneTasks': an array of tasks that have been marked as done.
  // - 'onUndoClick': a function to call when the user wants to undo a completed task.

  return (
    <div>
      <h2>Done Tasks</h2>
      {/* Display a header (h2) with the text "Done Tasks". */}

      {doneTasks.length === 0 ? (
        <p>No tasks are completed yet.</p>
      ) : (
        // If there are no tasks in the 'doneTasks' array, display a message indicating that no tasks are completed.
        <ul>
          {/* If there are tasks in the 'doneTasks' array, render them in an unordered list (ul). */}

          {doneTasks.map((task) => (
            <li key={task.id}>
              <TaskItem task={task} onUndoClick={() => onUndoClick(task.id)} />
              {/* For each task in the 'doneTasks' array, render a TaskItem component inside a list item (li).
                  Pass the task and the 'onUndoClick' function to the TaskItem component.
                  The 'onUndoClick' function is called with the task's ID when the undo button is clicked. */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoDone; // Export the TodoDone component so it can be used in other parts of the app.
