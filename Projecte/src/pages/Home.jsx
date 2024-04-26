import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Home({ userName }) {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Bienvenido a Riftward: Guardians of Mithra, explorador {userName}!</Card.Title>
              <Card.Text>
                Hace dos milenios, en la región norte de Mithra, surgió un fenómeno sin precedentes: desde las profundidades de un volcán dormido, una grieta en el tejido del espacio-tiempo, conocida como la Fisura Abisal, escupió una horda de criaturas misteriosas y variadas. Estos seres, conocidos como los Fissurians, surgieron en una miríada de colores y formas, desconcertando a los científicos y dejando una marca indeleble en la historia de Mithra.
              </Card.Text>
              <Card.Text>
                Sin embargo, la llegada de la Fisura Abisal también trajo consigo un cambio fundamental en algunos humanos. Un pequeño número de individuos, conocidos como los "Domadores", fueron bendecidos con poderes especiales que les permitían controlar y comunicarse con los Fissurians. Estos Domadores se convirtieron en una parte vital de la sociedad, actuando como intermediarios entre la humanidad y las misteriosas criaturas que emergían de la Fisura Abisal.
              </Card.Text>
              <Card.Text>
                A lo largo de los siglos, los Domadores han desempeñado un papel crucial en la protección y comprensión de los Fissurians. Utilizando sus habilidades únicas, son capaces de establecer vínculos con estas criaturas y dirigirlas hacia objetivos pacíficos o combativos según sea necesario. Sin embargo, el poder de los Domadores también ha atraído la atención de aquellos que buscan utilizar a los Fissurians para fines nefastos, lo que ha llevado a conflictos dentro de la sociedad y ha puesto en peligro la seguridad de Mithra.
              </Card.Text>
              <Card.Text>
                En respuesta a esta creciente amenaza, la organización conocida como los Riftmasters ha asumido la responsabilidad de entrenar y supervisar a los Domadores, garantizando que utilicen sus poderes de manera responsable y para el bienestar de todos. Al mismo tiempo, los Riftmasters están dedicados a la protección de Mithra contra cualquier amenaza que pueda surgir de las grietas dimensionales y sus habitantes.
              </Card.Text>
              <Card.Text>
                Nuestro protagonista es un joven Domador novato, ansioso por dominar sus habilidades y demostrar su valía en la lucha contra las fuerzas oscuras que amenazan con consumir su hogar. Con el apoyo de sus compañeros Domadores y la guía de los Riftmasters, se embarca en una emocionante aventura llena de desafíos, descubrimientos y peligros inesperados. Su destino está entrelazado con el de Mithra y los secretos ocultos dentro de la Fisura Abisal, y solo el tiempo dirá qué maravillas y horrores descubrirá en su camino hacia la grandeza.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
