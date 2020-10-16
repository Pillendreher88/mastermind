import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal.js';;

const ModalContext = React.createContext();

const createMessageData = (type, data) => {

  const mapTypeToMessageData = {
    welcome: createWelcome,
    registered: createRegistered,
    logout: createLogOut,
    networkError: createNetworkError,
    serverError: createServerError,
    sessionEnd: createSessionInfo,
    error: {
      title: "Something went wrong",
    }
  }

  return mapTypeToMessageData[type](data) || mapTypeToMessageData.error;
}

const createWelcome = ({ name, current_game, stats }) => {
  let content = [<p key="p0">Welcome {name}, your games will be recorded now.</p>];
  const title = "Welcome";

  if (current_game.history.length > 0 && !current_game.finished) {
    const attempts = current_game.history.length;
    const lastPlayed = current_game.history[attempts - 1].created_at;
    content.push(<p key="p1">Your last Game <br /> (<strong>attempts: {attempts}, last played: {lastPlayed})</strong>  <br /> was not finished.
               You can continue it now.
             </p>);
  }

  if (stats) {
    const gamesLeft = 10 - stats.user_stats_now.games;
    content.push(<p key="p2">
      {gamesLeft > 0 ? `You have to play ${gamesLeft}/10 more rounds to get ranked this month.` :
        `Your rank is ${stats.user_stats_now.rank} with ${stats.user_stats_now.games} rounds played this month and a average of 
                ${stats.user_stats_now.average}`}
    </p>);
  }
  return { title, content };
}

const createSessionInfo = () => {
  const title = "Session ended";
  let content = `Your session expired. Please login again.`;

  return { title, content };
}
const createNetworkError = () => {
  const title = "NetworkError";
  let content = `Server did not respond. Try again later.`;

  return { title, content };
}

const createServerError = () => {
  const title = "InternalServerError";
  let content = `Sorry, Our fault. Something went wrong.`;

  return { title, content };
}

const createLogOut = ({ name }) => {
  const title = "Logout was successfull";
  let content = `GoodBye ${name}, your games will no longer be recorded.`;

  return { title, content };
}

const createRegistered = ({ name }) => {
  const title = "Registration was successfull";
  let content = `Welcome ${name}, your games will be recorded now.`;

  return { title, content };
}

export default function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalRoot, setModalRoot] = useState();
  const [alertOpen, setAlert] = useState(false);
  const [message, setMessage] = useState({});

  const alert = (type, data) => {
    setAlert(true);
    const messageData = createMessageData(type, data);
    setMessage(messageData);
  }

  const close = () => {
    setAlert(false);
    setMessage("");
  }

  useEffect(() => {
    setModalRoot(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={{ modalRoot: modalRef, alert: alert }}>
        {children}
        <div ref={modalRef} />
        <Alert isOpen={alertOpen} content={message.content}
          onClose={close}
          parent={modalRoot ? () => modalRoot : undefined}
          title={message.title} />
      </ModalContext.Provider>
    </>
  );
}

export function Alert({ onClose, isOpen, content, parent, title, renderFooter }) {

  return (
    <Modal parent={parent} isOpen={isOpen}>
      <div className="modal-content">
        <div className="modal-header">
          <h5><div className="modal-title">{title}</div></h5>
        </div>
        <div className="modal-body">
          {content}
        </div>
        <div className="modal-footer">
          {renderFooter ? renderFooter() :
            <button className="btn btn-danger" onClick={onClose}>Close</button>}
        </div>
      </div>
    </Modal>
  )
}

export { ModalContext };