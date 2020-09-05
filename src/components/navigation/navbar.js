// home nav bar
import React from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";

const NavBar = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">Pyrotech.io</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">About</Nav.Link>
        <NavDropdown title="Projects" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Project Link</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Project Link</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Project Link</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Teams?</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form> */}
    </Navbar.Collapse>
  </Navbar>
);

export default NavBar;
