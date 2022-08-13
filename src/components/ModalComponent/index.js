import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const Modal = props => {
  if (!props.show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
            </div>
            <div className="modal-body">{props.children}</div>
            <div className="modal-footer">
            <button onClick={props.onClose} className="button">
                Close
            </button>
            </div>
        </div>
    </div>,
    document.getElementById("root")
  );
};

export default Modal;
