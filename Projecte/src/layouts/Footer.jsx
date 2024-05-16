import React from 'react';
import { Container } from 'react-bootstrap';
import './css/Footer.css'; // Importa el archivo CSS

function Footer() {
  return (
    <footer className="footer bg-dark py-3 gaming-footer"> {/* Añade la clase gaming-footer */}
      <Container>
        <p className="text-center text-neon-green">©2024 Riftward: Guardians of Mithra</p>
      </Container>
    </footer>
  );
}

export default Footer;
