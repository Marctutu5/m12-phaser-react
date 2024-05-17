import React, { useState, useEffect } from 'react';
import AuthService from '../../auth/AuthService';
import { Container, Row, Col, Card, ListGroup, Spinner } from 'react-bootstrap';
import './css/Backpack.css'; // Importa el archivo CSS

function Backpack({ userName }) {
  const [wallet, setWallet] = useState(null);
  const [backpack, setBackpack] = useState(null);
  const [userFissurials, setUserFissurials] = useState([]);
  const [attacks, setAttacks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const walletData = await AuthService.getWallet();
        setWallet(walletData);
        const backpackData = await AuthService.getBackpack();
        setBackpack(backpackData);
        const userFissurialsData = await AuthService.getUserFissurial();
        setUserFissurials(userFissurialsData);

        // Crear un objeto para almacenar los ataques de cada fissurial
        const attacksData = {};

        for (const uf of userFissurialsData) {
          const fissurialAttacks = await AuthService.getFissurialAttacksByFissurial(uf.fissurials_id);
          attacksData[uf.fissurials_id] = fissurialAttacks.attacks || [];
        }

        setAttacks(attacksData);
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
          <Card className="bg-dark text-neon-green border-neon-green">
            <Card.Body>
              <Card.Title className="text-center h2 font-orbitron">Welcome, {userName}!</Card.Title>
              {wallet && (
                <ListGroup variant="flush" className="text-neon-green">
                  <ListGroup.Item className="bg-dark border-neon-green">
                    <h4 className="text-neon-green">Wallet</h4>
                    <p className="text-neon-green">Coins: {wallet.coins}$</p>
                  </ListGroup.Item>
                </ListGroup>
              )}
              {backpack && (
                <Row>
                  <h4 className="mt-3 mb-3 font-orbitron">Backpack Items</h4>
                  {backpack.map((item) => (
                    <Col xs={12} sm={4} md={3} lg={3} className="mb-4" key={item.item.id}>
                      <Card className="bg-dark text-neon-green border-neon-green">
                        <Card.Img
                          variant="top"
                          src={item.item.photo}
                          alt={item.item.name}
                          className="backpack-img"
                        />
                        <Card.Body>
                          <Card.Title>{item.item.name}</Card.Title>
                          <Card.Text>Quantity: {item.quantity}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
              {userFissurials && Array.isArray(userFissurials) && (
                <Row>
                  <h4 className="mt-3 mb-3 font-orbitron">Your Fissurials</h4>
                  {userFissurials.map((uf) => (
                    <Col xs={12} sm={12} md={6} lg={6} className="mb-4" key={uf.fissurial.id}>
                      <Card className="bg-dark text-neon-green border-neon-green">
                        <Card.Img
                          variant="top"
                          src={`http://127.0.0.1:8000/${uf.fissurial.photo}`}
                          alt={uf.fissurial.name}
                          className="backpack-img"
                        />
                        <Card.Body>
                          <Card.Title>{uf.fissurial.name}</Card.Title>
                          <Card.Text>Current Life: {uf.current_life}</Card.Text>

                          {/* Mostrar ataques asociados */}
                          <h5>Attacks:</h5>
                          <ul>
                            {(attacks[uf.fissurials_id] || []).map((attack) => (
                              <li key={attack.id}>
                                {attack.name} - Power: {attack.power}
                              </li>
                            ))}
                          </ul>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
              {loading && (
                <div className="text-center mt-3">
                  <Spinner animation="border" role="status" className="text-neon-green">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
              {!loading && !wallet && !backpack && !userFissurials.length && (
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
