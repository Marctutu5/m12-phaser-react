import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './css/Header.css'; // Importa el archivo CSS

function Header({ userName, onLogout }) {
  return (
    <Navbar bg="dark" expand="lg" className="shadow-lg px-3 Header gaming-header"> {/* Añade la clase gaming-header */}
      <div className="container"> {/* Contenedor principal */}
        <Link to="/home" className="navbar-brand text-neon-green">RiftWard</Link> {/* Logo y nombre a la izquierda */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 text-neon-green" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto"> {/* Estos irán en el centro */}
            <Nav.Item>
              <Link to="/game" className="nav-link text-neon-green">Game</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/backpack" className="nav-link text-neon-green">Backpack</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/market" className="nav-link text-neon-green">Market</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/recharge" className="nav-link text-neon-green">Recharge</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/fissurials" className="nav-link text-neon-green">Fissurials</Link>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto"> {/* Estos irán a la derecha */}
            <Nav.Item>
              <Nav.Link disabled className="text-secondary">User: {userName}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/" className="nav-link text-neon-green" onClick={onLogout}>Logout</Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
