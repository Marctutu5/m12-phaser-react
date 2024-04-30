import React, { useState, useEffect } from 'react';
import AuthService from '../../auth/AuthService';
import { Container, Row, Col, Card, ListGroup, Spinner } from 'react-bootstrap';
import './css/Backpack.css';

function Backpack({ userName }) {
  const [wallet, setWallet] = useState(null);
  const [backpack, setBackpack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const walletData = await AuthService.getWallet();
        setWallet(walletData);
        const backpackData = await AuthService.getBackpack();
        setBackpack(backpackData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={12}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center h2">Welcome to Riftward: Guardians of Mithra, explorer {userName}!</Card.Title>
              {wallet && (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>Wallet</h4>
                    <p>Coins: {wallet.coins}$</p>
                  </ListGroup.Item>
                </ListGroup>
              )}
              {backpack && (
                <Row>
                  <h4 className="mt-3 mb-3">Backpack items</h4>
                  {backpack.map((item) => (
                    <Col xs={6} sm={4} md={3} className="mb-4" key={item.item.id}>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={item.item.photo}
                          alt={item.item.name}
                          className="backpack-img"
                        />
                        <Card.Body>
                          <Card.Title>{item.item.name}</Card.Title>
                          <Card.Text>
                            Quantity: {item.quantity}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
              {loading && (
                <div className="text-center mt-3">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
              {!loading && !wallet && !backpack && (
                <Card.Text className="text-center">No data available.</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Backpack;
