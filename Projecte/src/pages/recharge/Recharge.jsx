import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import AuthService from "../../auth/AuthService";

const coinPackages = [
    { price: '1.99', coins: 1000, description: '1000 Coins' },
    { price: '5.99', coins: 5250, description: '5250 Coins' },
    { price: '11.99', coins: 11000, description: '11000 Coins' },
    { price: '23.99', coins: 23000, description: '23000 Coins' },
    { price: '59.99', coins: 60000, description: '60000 Coins' },
    { price: '119.99', coins: 125000, description: '125000 Coins' }
];

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

            console.log("Recording recharge:", rechargeDetails);
            const rechargeResponse = await AuthService.recordRecharge(rechargeDetails);
            console.log("Recharge recorded successfully:", rechargeResponse);

            const walletResponse = await AuthService.updateWallet(coinPackage.coins);
            console.log("Wallet updated successfully:", walletResponse);
            alert(`Has recibido +${coinPackage.coins} coins en tu Wallet`);
        } catch (error) {
            console.error('Error during the recharge process:', error);
        }
    }).catch(error => {
        console.error('Error capturing the payment:', error);
    });
}


function Recharge() {
    return (
        <div>
            <h1>Recargar</h1>
            {coinPackages.map((coinPackage) => (
                <PayPalButtons
                    key={coinPackage.price}
                    style={{ layout: "horizontal" }}
                    fundingSource={FUNDING.PAYPAL}
                    createOrder={(data, actions) => createOrder(data, actions, coinPackage)}
                    onApprove={(data, actions) => onApprove(data, actions, coinPackage)}
                />
            ))}
        </div>
    );
}

export default Recharge;
