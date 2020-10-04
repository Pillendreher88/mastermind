import React, { useState, useContext } from 'react';
import { ColorPicker } from './ColorPicker.js';
import BoardContainer from './Container';
import { BoardThemeContext } from "./mastermind/BoardTheme.js";
import Navigation from './Nav/Navigation.js';
import LoginRegister from './LoginRegister/LoginRegister.js';
import { Stats } from './Top10Page/Stats.js';
import Help from './Help.js';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
  Route,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import { AuthContext } from './AuthProvider.js';
import ProfilePage from './ProfilPage/ProfilePage.js';

export default function Content() {


  const myRef = React.createRef();

  const match = useRouteMatch("/play");
  const { isAuthenticated, initialUserLoaded } = useContext(AuthContext);

  if (!initialUserLoaded) return null;

  return (
    <>
      <Navigation />
      <Row ref={myRef} className="min-vh-100">
        <Col md={6} className={match ? null : "d-none d-md-block"}>
          <BoardContainer />
        </Col>
        <Route path="/" exact>
        {isAuthenticated ? <Redirect to="/profile"/> : <Redirect to="/options"/>}
        </Route>
        <Route path={["/top10", "/help", "/login", "/options", "/profile"]}>
          <Col md={6}>
            <div className="mt-4 bg-secondary">
              <Route path="/options">
                <BoardThemeContext.Consumer>
                  {colorTheme => 
                  <ColorPicker 
                    colors_user={colorTheme.colorPalette} 
                    changeColor={colorTheme.changeColor} 
                    setToDefault={colorTheme.setDefault}/>}
                </BoardThemeContext.Consumer>
              </Route>
              <Route path="/top10">
                <Stats />
              </Route>
              <Route path="/help">
                <Help />
              </Route>
              <Route path="/login">
                {isAuthenticated ? <Redirect to="/top10" /> : <LoginRegister />}
              </Route>
              <Route path="/profile">
                {!isAuthenticated ? <Redirect to="/login" /> : <ProfilePage/>}
              </Route>
            </div>
          </Col >
        </Route>
      </Row>
    </>
  );
}
