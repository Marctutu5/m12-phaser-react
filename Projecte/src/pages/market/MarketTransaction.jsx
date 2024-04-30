import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Spinner } from 'react-bootstrap';
import AuthService from '../../auth/AuthService';

const MarketTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionData = await AuthService.getTransactions();
        // Ordenar las transacciones por fecha en orden descendente
        const sortedTransactions = transactionData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setTransactions(sortedTransactions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
        setError('Error fetching transaction data');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Container className="mt-3">
      <h2 className="text-center mb-4">Transaction History</h2>
      {loading ? (
        <div className="text-center mt-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          {transactions.length === 0 ? (
            <p className="text-center">No transactions available.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Buyer</th>
                  <th>Seller</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{transaction.item.name}</td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.buyer.name}</td>
                    <td>{transaction.seller.name}</td>
                    <td>${transaction.price}</td>
                    <td>{new Date(transaction.created_at).toLocaleString()}</td>
                    {/* Agrega más información de la transacción según tu estructura de datos */}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </Container>
  );
};

export default MarketTransaction;
