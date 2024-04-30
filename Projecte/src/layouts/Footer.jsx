import React from 'react';
import { Container } from 'react-bootstrap';
import './css/Footer.css';

function Footer() {
  return (
    <footer className="footer bg-light py-3"> {/* Se añade un fondo claro y padding vertical */}
      <Container>
        <p className="text-center text-muted">©2024 Riftward: Guardians of Mithra</p>
      </Container>
    </footer>
  );
}

export default Footer;
