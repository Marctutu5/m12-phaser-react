import React, { useState, useEffect } from 'react';
import AuthService from '../../auth/AuthService';
import { Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import './css/MarketSell.css';

const MarketSell = () => {
  const [backpack, setBackpack] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [listingData, setListingData] = useState({
    quantity: '',
    price: ''
  });
  const [loading, setLoading] = useState(true);
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
    <div className="mt-5 px-4 lg:px-16">
      <h1 className="text-center text-neon-green font-orbitron">Sell Your Items</h1>
      {loading ? (
        <div className="text-center mt-3">
          <Spinner animation="border" role="status" className="text-neon-green">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Row class="w-100">
            {backpack.map((item) => (
              <Col xs={12} sm={6} md={4} lg={3} key={item.item.id} className="mb-4">
                <Card
                  className={`h-100 bg-dark text-neon-green border-neon-green ${selectedItem === item ? "selected-item" : ""}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <Card.Img variant="top" src={item.item.photo} alt={item.item.name} className="coin-img"/>
                  <Card.Body>
                    <Card.Title>{item.item.name}</Card.Title>
                    <Card.Text>Available: {item.quantity}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {selectedItem && (
            <Form onSubmit={handleSubmit} className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label className="text-neon-green">Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={listingData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  max={selectedItem.quantity}
                  required
                  className="bg-dark text-neon-green border-neon-green"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-neon-green">Price per unit ($)</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={listingData.price}
                  onChange={handleInputChange}
                  required
                  className="bg-dark text-neon-green border-neon-green"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="bg-neon-green text-dark border-neon-green">Create Listing</Button>
            </Form>
          )}
        </>
      )}
    </div>
  );
};

export default MarketSell;
