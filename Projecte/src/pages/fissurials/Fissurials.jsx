import React, { useState, useEffect } from 'react';
import AuthService from '../../auth/AuthService';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import './css/Fissurials.css'; // Importa el archivo CSS

function Fissurials() {
  const [userFissurials, setUserFissurials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserFissurials = async () => {
      try {
        const userFissurialsData = await AuthService.getUserFissurials();
        setUserFissurials(userFissurialsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user fissurials:', error);
      }
    };

    fetchUserFissurials();
  }, []);

  return (
    <div className="full-page">
      <Row className="justify-content-center mt-5">
        <Col xs={12}>
          <Card className="bg-dark text-neon-green border-neon-green">
            <Card.Body>
              <Card.Title className="text-center h2 font-orbitron">All User Fissurials</Card.Title>
              {userFissurials.length > 0 ? (
                <Row>
                  {userFissurials.map((userFissurial) => (
                    <Col xs={6} sm={4} md={3} className="mb-4" key={userFissurial.id}>
                      <Card className="bg-dark text-neon-green border-neon-green">
                        <Card.Img
                          variant="top"
                          src={`http://127.0.0.1:8000/${userFissurial.fissurial.photo}`}
                          alt={userFissurial.fissurial.name}
                        />
                        <Card.Body>
                          <Card.Title>{userFissurial.fissurial.name}</Card.Title>
                          <h5>User: {userFissurial.user.name}</h5>
                          <ul>
                            <li>HP: {userFissurial.current_life}</li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center mt-3">
                  <Card.Text>No user fissurials available.</Card.Text>
                </div>
              )}
              {loading && (
                <div className="text-center mt-3">
                  <Spinner animation="border" role="status" className="text-neon-green">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Fissurials;
