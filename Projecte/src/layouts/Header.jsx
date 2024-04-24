import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import './css/Header.css'

function Header({ userName, onLogout }) {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
      <Link to="/home" className="navbar-brand text-muted" style={{ marginLeft: '1rem' }}>RiftWard</Link> {/* Ruta Home */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={{ marginRight: '1rem' }}>
          <Nav.Item>
            <Link to="/game" className="nav-link">Game</Link> {/* Ruta Game */}
          </Nav.Item>
          <Nav.Item>
            <Link to="/market" className="nav-link">Market</Link> {/* Ruta Market */}
          </Nav.Item>
          <Nav.Item>
            <Link to="/profile" className="nav-link">Profile</Link> {/* Ruta Profile */}
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled style={{ color: '#6c757d' }}>User: {userName}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link variant="outline-secondary" onClick={onLogout}>Logout</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
