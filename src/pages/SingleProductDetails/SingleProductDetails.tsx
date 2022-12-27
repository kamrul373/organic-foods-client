import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import "./SingleProductDetails.css";
import { CartContext } from '../../App';
import { addProductToLocal } from '../../Utility/addProductToLocal';
import { toast } from 'react-hot-toast';
type singleProductLoaderType = {
    "_id": string,
    "category": string,
    "cat_id": number,
    "shortDescription": string,
    "fullDescription": string,
    "name": string,
    "rate": number,
    "price": number,
    "discount": number,
    "quantity": number,
    "coverImage": string,
    "specifications": {
        "weight": string,
        "dimensions": {
            "long": string,
            "height": number
        },
        "color": string,
        "size": string
    }
}
const SingleProductDetails = () => {
    const singleProductData: singleProductLoaderType = useLoaderData() as singleProductLoaderType;

    const { cart, setCart } = useContext(CartContext)
    const handleCart = (e: any) => {
        e.preventDefault();
        const quantity = parseInt(e.target.quantity.value)

        setCart(cart + quantity);

        addProductToLocal(singleProductData._id, quantity);
        toast.success(`${quantity} ${singleProductData.name} added`)
    }

    return (
        <div className='lg:px-16 px-4 my-8'>
            <div className='flex lg:flex-row flex-col-reverse justify-start lg:gap-8'>
                <div className='px-4 lg:mt-8 lg:w-[50%]'>
                    <div className='mb-4 text-center' >
                        <img src={singleProductData.coverImage} alt={singleProductData.name} className="inline-block" />
                    </div>
                    <p className='text-justify'>
                        {singleProductData.fullDescription}
                    </p>
                </div>
                <div className='lg:text-left text-center lg:mt-8'>
                    <h2 className=' text-3xl font-bold'>{singleProductData.name}</h2>
                    <Rater rating={singleProductData.rate} interactive={false} />
                    <h3 className='font-bold text-3xl my-2'>${singleProductData.price}</h3>

                    <div className='py-2'>
                        <form onSubmit={handleCart}>
                            <div>
                                <p className='py-2'>Qty </p>
                                <input type="number" name="quantity" id="" min="1" max="100" defaultValue={1} className="pl-3" />
                            </div>
                            <div className='mt-4'>
                                <button type='submit' className="btn btn-primary text-white cursor-pointer hover:bg-secondary duration-500 border-none">Add to cart</button>
                            </div>
                        </form>
                        <p className='mt-2'>Category: <span className='capitalize'>{singleProductData.category}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProductDetails;