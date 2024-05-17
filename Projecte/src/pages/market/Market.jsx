import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Nav, Card, Alert, Spinner } from 'react-bootstrap';
import AuthService from '../../auth/AuthService';
import './css/Market.css';

const Market = () => {
  const gameContainer = document.querySelector('#game-container');
  if (gameContainer){
  gameContainer.style.display = 'none';

  }
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const walletData = await AuthService.getWallet();
        setWallet(walletData);
        setLoading(false); // Marcar la carga como completa cuando se obtienen los datos del monedero
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        setError('Error fetching wallet data');
        setLoading(false); // Marcar la carga como completa incluso en caso de error
      }
    };

    fetchWallet();
  }, []);

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4  text-neon-green font-orbitron">Market</h1>
      <Nav variant="tabs" className="mb-3 justify-content-center">
        <Nav.Item>
          <NavLink to="/market/buy" className="nav-link text-neon-green" activeClassName="active">
            Buy
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/market/sell" className="nav-link text-neon-green" activeClassName="active">
            Sell
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/market/manage" className="nav-link text-neon-green" activeClassName="active">
            Manage
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/market/transaction" className="nav-link text-neon-green" activeClassName="active">
            Transactions
          </NavLink>
        </Nav.Item>
      </Nav>
      {loading ? ( // Mostrar spinner mientras se cargan los datos
        <div className="text-center mt-3">
          <Spinner animation="border" role="status" className="text-neon-green">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          {wallet && (
            <Card className="wallet-card bg-dark text-neon-green border-neon-green">
              <Card.Body>
                <Card.Title className="text-center">Your Wallet</Card.Title>
                <Card.Text className="text-center">Coins: {wallet.coins}$</Card.Text>
              </Card.Body>
            </Card>
          )}
          <Outlet />
        </>
      )}
    </div>
  );
};

export default Market;
