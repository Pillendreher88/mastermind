import React, { useContext, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { AuthContext } from "../AuthProvider.js";
import { Header } from '../Header.js';
import { Button, Image } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import NavLink from './NavLink.js';
import InfoIcon from '../icons/Info.js';
import GearIcon from '../icons/Gear.js';
import TrophyIcon from '../icons/Trophy.js';
import AccountIcon from '../icons/Account.js';
import ControllerIcon from '../icons/Controller.js';
import LogoutIcon from '../icons/Logout.js';
import AvatarIcon from '../icons/Avatar.js';

const Navigation = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [show, setShow] = useState(false);

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
          <AvatarIcon/>
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
        <Button className="d-md-none" size="lg" onClick={() => setShow(true)}>
          <img src="/open-iconic-master/svg/menu.svg" width="25" height="25" alt="icon name" />
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

