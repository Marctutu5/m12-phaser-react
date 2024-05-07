import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';

const Recharge = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Recharge</h1>
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <NavLink to="/recharge/offers" className="nav-link" activeClassName="active">
            Recharge Offers
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/recharge/transactions" className="nav-link" activeClassName="active">
            Recharge History
          </NavLink>
        </Nav.Item>
      </Nav>
      <Outlet />
    </Container>
  );
};

export default Recharge;
