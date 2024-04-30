import React, { useState, useEffect } from 'react';
import AuthService from '../../auth/AuthService';
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import './css/MarketSell.css'

const MarketSell = () => {
  const [backpack, setBackpack] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [listingData, setListingData] = useState({
    quantity: '',
    price: ''
  });
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBackpack = async () => {
      try {
        const data = await AuthService.getBackpack();
        setBackpack(data);
        setLoading(false); // Marcar la carga como completa cuando se obtienen los datos
      } catch (error) {
        setError('Error fetching backpack data: ' + error.message);
        setLoading(false); // Marcar la carga como completa incluso en caso de error
      }
    };

    fetchBackpack();
  }, []);

  const handleInputChange = (e) => {
    setListingData({ ...listingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItem) {
      setError("Please select an item to sell.");
      return;
    }
    try {
      const response = await AuthService.createListing(selectedItem.item.id, listingData.quantity, listingData.price);
      setSuccess('Listing created successfully!');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Sell Your Items</h1>
      {loading ? ( // Mostrar spinner mientras se cargan los datos
        <div className="text-center mt-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Row>
            {backpack.map((item) => (
              <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={item.item.id}>
                <Card className={selectedItem === item ? "selected-item" : ""} onClick={() => setSelectedItem(item)}>
                  <Card.Img variant="top" src={item.item.photo} alt={item.item.name} />
                  <Card.Body>
                    <Card.Title>{item.item.name}</Card.Title>
                    <Card.Text>
                      Available: {item.quantity}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {selectedItem && (
            <Form onSubmit={handleSubmit} className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" name="quantity" value={listingData.quantity} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price per unit ($)</Form.Label>
                <Form.Control type="text" name="price" value={listingData.price} onChange={handleInputChange} required />
              </Form.Group>
              <Button variant="primary" type="submit">Create Listing</Button>
            </Form>
          )}
        </>
      )}
    </Container>
  );
};

export default MarketSell;
