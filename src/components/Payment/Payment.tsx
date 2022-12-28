import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckoutPaymentForm from './CheckoutPaymentForm';
import { loadStripe } from '@stripe/stripe-js';
type checkoutType = {
    productInfo: any,
    cartInfo: {
        total: number,
        subTotal: number,
        deliveryCharge: number,
    }
}
const Payment = ({ productInfo, cartInfo }: checkoutType) => {
    const orderData = { productInfo, cartInfo }
    const stripePromise = (loadStripe(process.env.REACT_APP_STRIPE_PK as string));
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutPaymentForm orderData={orderData} />
            </Elements>
        </div>
    );
};

export default Payment;