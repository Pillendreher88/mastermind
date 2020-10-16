import React, { useContext, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { AuthContext } from "../AuthProvider.js";
import { Header } from '../Header.js';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import NavLink from './NavLink.js';
import InfoIcon from '../icons/Info.js';
import GearIcon from '../icons/Gear.js';
import TrophyIcon from '../icons/Trophy.js';
import AccountIcon from '../icons/Account.js';
import ControllerIcon from '../icons/Controller.js';
import LogoutIcon from '../icons/Logout.js';
import AvatarIcon from '../icons/Avatar.js';
import MenuIcon from '../icons/Menu.js';
import { Transition } from 'react-transition-group';


const Navigation = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const renderNavLinks = () => {
    return (
      <>
        <NavLink to="/options">
          <GearIcon />
            Options
        </NavLink>
        <NavLink to="/top10" >
          <TrophyIcon />
                Top10
        </NavLink>
        <NavLink to="/help">
          <InfoIcon />
              Help
        </NavLink>
        <NavLink className="d-md-none" to="/play">
          <ControllerIcon />
                Play
        </NavLink>
        {!isAuthenticated &&
          <NavLink to="/login">
            <AccountIcon />
              Login
          </NavLink>
        }
        {isAuthenticated &&
          <NavLink to="/profile">
            <AvatarIcon />
                My Profile
          </NavLink>
        }
        {isAuthenticated &&
          <Nav.Item>
            <Nav.Link onClick={() => logout()}>
              <LogoutIcon />
                Logout
              </Nav.Link>
          </Nav.Item>
        }
      </>
    );
  }


  const style = {
    position: "fixed",
    left: 0,
    top: 0,
    padding: "0.5rem",
    backgroundColor: "black",
    width: "100%",
    color: "white",
    transition: "transform 0.7s ease",
    zIndex: 1000,
  };
  const transitionStyles = {
    entering: { transform: "translateY(0)"},
    entered: { transform: "translateY(0)" },
    exiting: { transform: "translateY(-100%)" },
    exited: { transform: "translateY(-100%)"},
  };

  return (

    <Row className="justify-content-center align-items-end">
      <Modal
        className="left"
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Mastermind
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Nav className="flex-column">
            {renderNavLinks()}
          </Nav>
        </Modal.Body>
      </Modal>
      <Col className="d-none d-md-block " >
        <div className="info-container" >
          <Header />
        </div>
      </Col>
      <Col className="bg-dark">
        <Transition in={showInfo} timeout={300}>
          {state => (
            <div style={{ ...transitionStyles[state], ...style }}>
              <Header closable onClose = {() => setShowInfo(false)}/>
            </div>
          )}
        </Transition>
        <Button 
          variant="outline-light"
          className="d-md-none mr-2" 
          size="lg" 
          onClick={() => setShow(true)}>
          <MenuIcon />
        </Button>
        <Button 
          variant="outline-light" 
          className="d-md-none" 
          size="lg" 
          onClick={() => setShowInfo(true)}>
          MyStats
        </Button>
        <div className="d-none d-md-block">
          <Nav variant="pills" className="my-nav-tab" >
            {renderNavLinks()}
          </Nav>
        </div>
      </Col>
    </Row>
  );
}

export default Navigation;

