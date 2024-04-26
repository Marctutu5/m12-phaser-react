import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header({ userName, onLogout }) {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-3">
      <Link to="/home" className="navbar-brand">RiftWard</Link> {/* Logo y nombre a la izquierda */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto"> {/* Estos irán en el centro */}
          <Nav.Item>
            <Link to="/game" className="nav-link text-dark">Game</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/backpack" className="nav-link text-dark">Backpack</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/market" className="nav-link text-dark">Market</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/recharge" className="nav-link text-dark">Recharge</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/profile" className="nav-link text-dark">Profile</Link>
          </Nav.Item>
        </Nav>
        <Nav className="mr-auto"> {/* Estos irán a la izquierda */}
          <Nav.Item>
            <Nav.Link disabled className="text-secondary">User: {userName}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/" className="nav-link text-dark" onClick={onLogout}>Logout</Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
