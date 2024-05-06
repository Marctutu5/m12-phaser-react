import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './css/Header.css'; // Importa el archivo CSS

function Header({ userName, onLogout }) {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-3 Header"> {/* Añade la clase Header */}
      <div className="container"> {/* Contenedor principal */}
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
              <Link to="/fissurials" className="nav-link text-dark">Fissurials</Link>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto"> {/* Estos irán a la derecha */}
            <Nav.Item>
              <Nav.Link disabled className="text-secondary">User: {userName}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/" className="nav-link text-dark" onClick={onLogout}>Logout</Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
