import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

function Header({ userName, onLogout }) {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
      <Navbar.Brand href="#home" className="text-muted" style={{ marginLeft: '1rem' }}>Mi App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={{ marginRight: '1rem' }}>
          <Nav.Item>
            <Nav.Link disabled style={{ color: '#6c757d' }}>Welcome, {userName}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Button variant="outline-secondary" onClick={onLogout}>Logout</Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
