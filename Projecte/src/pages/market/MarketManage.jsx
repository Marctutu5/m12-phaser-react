import React, { useState, useEffect } from 'react';
import AuthService from '../../auth/AuthService';
import { Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import './css/MarketManage.css'; // Estilos específicos para este componente

const MarketManage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const data = await AuthService.getListings();
        console.log("Listings Data:", data);  // Esto mostrará la estructura de datos en la consola
        setListings(data);
        setLoading(false); // Marcar la carga como completa cuando se obtienen los datos
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false); // Marcar la carga como completa incluso en caso de error
      }
    };

    fetchMyListings();
  }, []);

  const handleDelete = async (listingId) => {
    try {
      await AuthService.cancelListing(listingId);
      setListings(listings.filter(listing => listing.id !== listingId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mt-5 px-4 lg:px-16">
      <h1 className="text-center text-neon-green font-orbitron">Manage Your Listings</h1>
      {loading ? ( // Mostrar spinner mientras se cargan los datos
        <div className="text-center mt-3">
          <Spinner animation="border" role="status" className="text-neon-green">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          <Row class="w-100">
            {listings.map(listing => (
              <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={listing.id}>
                <Card className="h-100 listing-card bg-dark text-neon-green border-neon-green">
                  <Card.Img variant="top" src={listing.item.photo || 'default_image_url.jpg'} alt={listing.item.name} className="coin-img"/>
                  <Card.Body>
                    <Card.Title>{listing.item.name}</Card.Title>
                    <Card.Text>Price: ${listing.price}</Card.Text>
                    <Card.Text>Available: {listing.quantity}</Card.Text>
                    <Button variant="danger" onClick={() => handleDelete(listing.id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default MarketManage;
