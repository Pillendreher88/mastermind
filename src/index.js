import React from 'react';
import ReactDOM from 'react-dom';
import Gamestate from './mastermind/Gamestate.js';
import BoardTheme from './mastermind/BoardTheme.js';
import AuthProvider from "./AuthProvider.js";
import './app.scss';
import Content from './Content';
import ModalProvider from './ModalProvider';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
} from "react-router-dom";


function App() {

  return (
    <Container fluid="md" className="bg-dark">
      <Router basename="/mastermind">
        <ModalProvider>
          <Gamestate>
            <BoardTheme>
              <AuthProvider>
                <Content />
              </AuthProvider>
            </BoardTheme>
          </Gamestate>
        </ModalProvider>
      </Router>
    </Container>
  );
}

ReactDOM.render(<App />, document.getElementById('react-app'));

export default App;
