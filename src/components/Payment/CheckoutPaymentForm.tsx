import React, { useState, useEffect } from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
type orderDataType = {
    orderData: {
        productInfo: {
            _id: string,
            quantity: number,
            price: number
        },
        cartInfo: {
            total: number,
            subTotal: number,
            deliveryCharge: number,
        }
    }
}

type paymentIntentType = {
    id: string,
    status: string
}

const CheckoutPaymentForm = ({ orderData }: orderDataType) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [error, setError] = useState<string | undefined | null>("");
    const [processing, setProcessing] = useState(false)
    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}/create-payment-intent`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(orderData.cartInfo)
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))
    }, [orderData.cartInfo])

    const handleSubmit = async (event: any) => {
        // Block native form submission.
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const address = form.address.value;

        console.log(name, email, phone, address)

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
            setError(error.message);
        } else {
            setError("");
        }
        if (!clientSecret) {
            return;
        }
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                        address: address,
                        phone: phone,
                    },
                },
            },
        );

        if (paymentIntent?.status === "succeeded") {
            const paymentData = {
                transanction_id: paymentIntent.id,
                productInfo: orderData.productInfo,
                price: orderData.cartInfo,
            }
            console.log(paymentData);
            fetch(`${process.env.REACT_APP_HOST}/payments`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("organio-token")}`
                },
                body: JSON.stringify(paymentData)
            })
                .then(response => response.json)
                .then(data => {
                    toast.success("You paid successfully!")
                    setTransactionId(paymentIntent.id)
                    console.log(data);
                })
        }
        if (confirmError) {
            return setError(confirmError.message)
        } else {
            setError("");
        }
        console.log("payment intent", paymentIntent)
        setProcessing(false)
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