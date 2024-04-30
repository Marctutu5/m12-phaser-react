import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './css/Home.css'; // Importa los estilos específicos para este componente

function Home({ userName }) {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card className="home-card">
            <Card.Body>
              <Card.Title className="home-title">Welcome to Riftward: Guardians of Mithra, explorer {userName}!</Card.Title>
              <Card.Text className="home-text">
                Two millennia ago, in the northern region of Mithra, an unprecedented phenomenon emerged: from the depths of a dormant volcano, a fissure in the fabric of space-time, known as the Abyssal Fissure, spewed forth a horde of mysterious and varied creatures. These beings, known as the Fissurians, emerged in a myriad of colors and forms, baffling scientists and leaving an indelible mark on Mithra's history.
              </Card.Text>
              <Card.Text className="home-text">
                However, the arrival of the Abyssal Fissure also brought about a fundamental change in some humans. A small number of individuals, known as the "Tamers," were blessed with special powers that allowed them to control and communicate with the Fissurians. These Tamers became a vital part of society, acting as intermediaries between humanity and the mysterious creatures emerging from the Abyssal Fissure.
              </Card.Text>
              <Card.Text className="home-text">
                Over the centuries, Tamers have played a crucial role in the protection and understanding of the Fissurians. Using their unique abilities, they are able to establish bonds with these creatures and direct them towards peaceful or combative objectives as needed. However, the power of the Tamers has also attracted the attention of those seeking to use the Fissurians for nefarious purposes, leading to conflicts within society and endangering Mithra's security.
              </Card.Text>
              <Card.Text className="home-text">
                In response to this growing threat, the organization known as the Riftmasters has taken on the responsibility of training and overseeing Tamers, ensuring they use their powers responsibly and for the greater good. At the same time, the Riftmasters are dedicated to protecting Mithra against any threats that may arise from dimensional rifts and their inhabitants.
              </Card.Text>
              <Card.Text className="home-text">
                Our protagonist is a young novice Tamer, eager to master his abilities and prove his worth in the fight against the dark forces threatening to consume his home. With the support of his fellow Tamers and the guidance of the Riftmasters, he embarks on an exciting adventure full of challenges, discoveries, and unexpected dangers. His destiny is intertwined with that of Mithra and the hidden secrets within the Abyssal Fissure, and only time will tell what wonders and horrors he will uncover on his path to greatness.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
