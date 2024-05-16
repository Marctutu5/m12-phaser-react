import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import './css/Recharge.css'; // Importa el archivo CSS

const Recharge = () => {
  return (
    <div className="full-page mt-5">
      <h1 className="text-center mb-4 text-neon-green font-orbitron">Recharge</h1>
      <Nav variant="tabs" className="mb-3 justify-content-center">
        <Nav.Item>
          <NavLink to="/recharge/offers" className="nav-link text-neon-green" activeClassName="active">
            Recharge Offers
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/recharge/transactions" className="nav-link text-neon-green" activeClassName="active">
            Recharge History
          </NavLink>
        </Nav.Item>
      </Nav>
      <Outlet />
    </div>
  );
};

export default Recharge;
