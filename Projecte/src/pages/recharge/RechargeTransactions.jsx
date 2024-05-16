import React, { useState, useEffect } from 'react';
import { Table, Alert, Spinner } from 'react-bootstrap';
import AuthService from '../../auth/AuthService';
import './css/RechargeTransactions.css'; // Importa el archivo CSS

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
        <div className="full-page mt-3">
            <h2 className="text-center mb-4 text-neon-green font-orbitron">Recharge History</h2>
            {loading ? (
                <div className="text-center mt-3">
                    <Spinner animation="border" role="status" className="text-neon-green">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {recharges.length === 0 ? (
                        <p className="text-center text-neon-green">No recharges made yet.</p>
                    ) : (
                        <Table striped bordered hover variant="dark" className="text-neon-green">
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
        </div>
    );
};

export default RechargeTransactions;
