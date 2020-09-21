import React from 'react'
import { NavLink as Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

export default function NavLink({ children, ...props }) {

  //const match = useRouteMatch(props.to);

  return (
    <Nav.Item>
      <Nav.Link as={Link} activeClassName="active" {...props}>
        {children}
      </Nav.Link>
    </Nav.Item>
  )
}
