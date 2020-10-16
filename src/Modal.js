import React, { useEffect } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  fade: PropTypes.bool,
  styleContent: PropTypes.object,
  styleOverlay: PropTypes.object,
  classNameContent: PropTypes.string,
  classNameOverlay: PropTypes.string,
  id: PropTypes.string,
  role: PropTypes.string,
  parent: PropTypes.func,
}

const defaultProps = {
  fade: true,
  isOpen: false,
  styleContent: {},
  styleOverlay: {},
  role: "dialog",
  parent: () => document.body,
};

const defaultStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    zIndex: 1000,
  },
  content: {
    maxWidth: "500px",
    width: "80vw",
    position: "absolute",
    left: "50%",
    top: 0,
    opacity: 1,
    transform: "translate(-50%,-50%)",
    border: "1px solid #ccc",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
  }
};

const Modal = ({ isOpen,
  styleContent,
  styleOverlay,
  classNameOverlay,
  classNameContent,
  parent,
  children,
  role,
  id,
}) => {

  useEffect(() => {
    let container = document.createElement("div");
    parent().appendChild(container);
  }, []);

  const transitionStyles = {

    entering: { top: 0 },
    entered: { top: "50%", transition: "top 0.4s" },
    exiting: { top: 0, transition: "top 0.4s" },
    exited: { top: 0 },
  };

  const portal = <Transition in={isOpen} timeout={{ exit: 500, enter: 1 }} unmountOnExit={true}>
    {state => (
      <div
        className={classNameOverlay}
        style={classNameOverlay ? null : { ...styleOverlay, ...defaultStyles.overlay }}
        id={id}
        tabIndex="-1"
        role={role}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div
          className={classNameContent}
          style={classNameContent ? null : { ...styleContent, ...defaultStyles.content, ...transitionStyles[state] }}>
          {children}
        </div>
      </div>)}
  </Transition>

  return ReactDOM.createPortal(
    portal, parent()
  );
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
export default Modal;