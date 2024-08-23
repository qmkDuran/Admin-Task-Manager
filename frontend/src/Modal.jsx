import React from "react"; // Import the React library to use JSX and create components.

const Modal = ({ show, handleClose, children }) => {
  // Modal is a functional component that takes in three props:
  // - 'show': controls whether the modal is visible or not.
  // - 'handleClose': a function that will be called when the modal should close.
  // - 'children': any elements that are passed inside the modal to be displayed.

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      {/* The outer div has a class of 'modal'. 
          If 'show' is true, it also adds a 'show' class to make the modal visible. 
          If 'show' is false, only the 'modal' class is applied, which likely hides it. */}
      <div className="modal-content">
        {/* This div contains the content of the modal. */}
        <span className="close-btn" onClick={handleClose}>
          &times;
          {/* This span represents a close button (usually an 'X').
              When clicked, it triggers the 'handleClose' function to close the modal. */}
        </span>
        {children}
        {/* 'children' represents whatever content was passed inside the Modal component.
            It will be rendered inside this div. */}
      </div>
    </div>
  );
};

export default Modal; // Export the Modal component so it can be used in other parts of the app.
