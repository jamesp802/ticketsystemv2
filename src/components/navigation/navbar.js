// home nav bar
import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const NavBar = ({ user }) => (
  <Navbar variant="dark" bg="dark" expand="lg">
    <Navbar.Brand href="/">Pyrotech.io</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/dev">Development</Nav.Link>
        {user === null ? (
          <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </>
        ) : (
          <>
            <NavDropdown title="Projects" id="basic-nav-dropdown">
              {user.projects.map((proj) => {
                return (
                  <NavDropdown.Item href={`/dash/project/${proj.project_id}`}>
                    {proj.project_name}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <Nav.Link href="/dash">Dashboard</Nav.Link>
            <Nav.Link href="/logout">
              Logout
            </Nav.Link>
          </>
        )}
      </Nav>
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form> */}
    </Navbar.Collapse>
  </Navbar>
);

export default NavBar;
