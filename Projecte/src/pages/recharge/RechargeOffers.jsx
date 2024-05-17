import React from 'react';
import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import { Card, Row, Col } from 'react-bootstrap';
import AuthService from "../../auth/AuthService";
import './css/RechargeOffers.css'; // Importa el archivo CSS

const coinPackages = [
    { price: '1.99', coins: 1000, description: '1000 Coins', imageUrl: 'http://127.0.0.1:8000/storage/Coin.jpg' },
    { price: '5.99', coins: 5250, description: '5250 Coins', imageUrl: 'http://127.0.0.1:8000/storage/Coin.jpg' },
    { price: '11.99', coins: 11000, description: '11000 Coins', imageUrl: 'http://127.0.0.1:8000/storage/Coin.jpg' },
    { price: '23.99', coins: 23000, description: '23000 Coins', imageUrl: 'http://127.0.0.1:8000/storage/Coin.jpg' },
    { price: '59.99', coins: 60000, description: '60000 Coins', imageUrl: 'http://127.0.0.1:8000/storage/Coin.jpg' },
    { price: '119.99', coins: 125000, description: '125000 Coins', imageUrl: 'http://127.0.0.1:8000/storage/Coin.jpg' }
];

function RechargeOffers() {
    return (
        <div className="">
            <h2 className="text-center mt-4 mb-4 text-neon-green font-orbitron">Recharge Offers</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {coinPackages.map((coinPackage, idx) => (
                    <Col key={idx}>
                        <Card className="bg-dark text-neon-green border-neon-green">
                            <Card.Img variant="top" src={coinPackage.imageUrl} alt="Coin Package" className="coin-img"/>
                            <Card.Body>
                                <Card.Title>{coinPackage.description}</Card.Title>
                                <Card.Text>
                                    Price: ${coinPackage.price}
                                    <br/>
                                    Coins: {coinPackage.coins}
                                </Card.Text>
                                <PayPalButtons
                                    style={{ layout: "horizontal" }}
                                    fundingSource={FUNDING.PAYPAL}
                                    createOrder={(data, actions) => createOrder(data, actions, coinPackage)}
                                    onApprove={(data, actions) => onApprove(data, actions, coinPackage)}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

function createOrder(data, actions, coinPackage) {
    return actions.order.create({
        purchase_units: [{
            description: coinPackage.description,
            amount: {
                value: coinPackage.price,
                currency_code: "USD"
            }
        }]
    });
}

function onApprove(data, actions, coinPackage) {
    return actions.order.capture().then(async function(details) {
        try {
            const rechargeDetails = {
                transaction_id: details.id,
                amount: coinPackage.price,
                currency: 'USD',
                coins_purchased: coinPackage.coins,
                payer_email: details.payer.email_address,
                payer_name: `${details.payer.name.given_name} ${details.payer.name.surname}`
            };

            const rechargeResponse = await AuthService.recordRecharge(rechargeDetails);
            if (rechargeResponse) {
                const walletResponse = await AuthService.updateWallet(coinPackage.coins);
                console.log("Wallet updated successfully:", walletResponse);
                alert(`Has recibido +${coinPackage.coins} coins en tu Wallet`);
            }
        } catch (error) {
            console.error('Error during the recharge process:', error);
        }
    }).catch(error => {
        console.error('Error capturing the payment:', error);
    });
}

export default RechargeOffers;
