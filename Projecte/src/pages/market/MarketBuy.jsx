import React, { useState, useEffect } from 'react';
import AuthService from '../../auth/AuthService';
import { Container, Row, Col, Card, Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import './css/MarketBuy.css';

const MarketBuy = () => {
  const [listings, setListings] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await AuthService.getListings(true);
        setListings(data);
        const initialQuantities = {};
        data.forEach(listing => {
          initialQuantities[listing.id] = 1;
        });
        setQuantities(initialQuantities);
        setLoading(false); // Marcar la carga como completa cuando se obtienen los datos
      } catch (error) {
        setError(error.message);
        setLoading(false); // Marcar la carga como completa incluso en caso de error
      }
    };

    fetchListings();
  }, []);

  const handleQuantityChange = (listingId, value) => {
    setQuantities({ ...quantities, [listingId]: value });
  };

  const handlePurchase = async (listingId) => {
    const quantity = quantities[listingId];
    try {
      const transactionData = await AuthService.createTransaction(listingId, quantity);
      alert('Compra realizada con éxito: ' + JSON.stringify(transactionData));
      const updatedListings = await AuthService.getListings(true);
      setListings(updatedListings);
    } catch (error) {
      setError(error.message);
      alert('Error en la compra: ' + error.message);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Listings Available for Purchase</h1>
      {loading ? ( // Mostrar spinner mientras se cargan los datos
        <div className="text-center mt-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {error && <p className="text-danger">{error}</p>}
          <Row>
            {listings.map(listing => (
              <Col md={4} key={listing.id} className="mb-4">
                <Card className="h-100">
                  <Card.Img variant="top" src={listing.item.photo} className="p-3"/>
                  <Card.Body>
                    <Card.Title>{listing.item.name}</Card.Title>
                    <Card.Text>Price: ${listing.price} per unit</Card.Text>
                    <Card.Text>Available: {listing.quantity}</Card.Text>
                    <Card.Text>Sold by: {listing.seller.name}</Card.Text>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="number"
                        min="1"
                        max={listing.quantity}
                        value={quantities[listing.id]}
                        onChange={(e) => handleQuantityChange(listing.id, e.target.value)}
                      />
                      <Button variant="outline-secondary" onClick={() => handlePurchase(listing.id)}>
                        Buy
                      </Button>
                    </InputGroup>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default MarketBuy;
