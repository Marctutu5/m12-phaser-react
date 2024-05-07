import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Spinner } from 'react-bootstrap';
import AuthService from '../../auth/AuthService';

const RechargeTransactions = () => {
    const [recharges, setRecharges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecharges = async () => {
            try {
                setLoading(true);
                const data = await AuthService.getRecharges();
                setRecharges(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchRecharges();
    }, []);

    return (
        <Container className="mt-3">
            <h2 className="text-center mb-4">Recharge History</h2>
            {loading ? (
                <div className="text-center mt-3">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {recharges.length === 0 ? (
                        <p className="text-center">No recharges made yet.</p>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Amount</th>
                                    <th>Currency</th>
                                    <th>Coins Purchased</th>
                                    <th>PayPal Email</th>
                                    <th>PayPal Name</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recharges.map((recharge, index) => (
                                    <tr key={index}>
                                        <td>{recharge.transaction_id}</td>
                                        <td>{recharge.amount}</td>
                                        <td>{recharge.currency}</td>
                                        <td>{recharge.coins_purchased}</td>
                                        <td>{recharge.payer_email}</td>
                                        <td>{recharge.payer_name}</td>
                                        <td>{new Date(recharge.created_at).toLocaleString()}</td>
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

export default RechargeTransactions;
