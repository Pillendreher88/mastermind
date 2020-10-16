import React from 'react';
import NavLink from './Nav/NavLink.js';
import { Col } from 'react-bootstrap';



const Info = () => {

  return (
    <Col xs={12} md>
      <div className="info-message">
        <p>You are not logged in.
        In order to get your rounds saved and get ranked, you have to create an account. </p>
        <div className="my-nav-tab nav nav-pills">
          <NavLink to="/login">
            Go to Login
          </NavLink>
        </div>
      </div>
    </Col>
  );
}

export default Info;