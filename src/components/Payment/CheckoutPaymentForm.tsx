import React from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
type orderDataType = {
    orderData: {}
}


const CheckoutPaymentForm = ({ orderData }: orderDataType) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: any) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Your Name" className="input input-bordered input-primary w-full " name="name" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Your Email" className="input input-bordered input-primary w-full " name="email" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Phone Number</span>
                </label>
                <input type="text" placeholder="Your Phone" className="input input-bordered input-primary w-full " name="phone" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Address</span>
                </label>
                <textarea className="textarea textarea-primary" placeholder="Address" name="address" required></textarea>
            </div>
            <CardElement
                className='mt-4 font-bold'
                options={{
                    style: {
                        base: {
                            fontSize: '18px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#76A713',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe} className="btn btn-primary text-white w-full mt-8 lg:mt-5">
                Pay
            </button>
        </form>
    );
};

export default CheckoutPaymentForm;