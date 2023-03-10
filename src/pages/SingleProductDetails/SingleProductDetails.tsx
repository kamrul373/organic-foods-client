import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import "./SingleProductDetails.css";
import { CartContext } from '../../App';
import { addProductToLocal } from '../../Utility/addProductToLocal';
import { toast } from 'react-hot-toast';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
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
            <div className='flex lg:flex-row flex-col-reverse justify-start items-center lg:gap-8'>
                <div className='px-4 lg:mt-8 lg:w-[50%]'>
                    <div className='mb-4 text-center' >
                        <img src={singleProductData.coverImage} alt={singleProductData.name} className="inline-block" />
                    </div>
                </div>
                <div className='lg:text-left text-center lg:mt-8'>
                    <h2 className=' text-3xl font-bold'>{singleProductData.name}</h2>
                    <Rater rating={singleProductData.rate} interactive={false} />
                    <h3 className='font-bold text-3xl my-2'>${singleProductData.price}</h3>
                    <p className='text-justify'>
                        {singleProductData.shortDescription}
                    </p>
                    <div className='py-2'>
                        <form onSubmit={handleCart}>
                            <div>
                                <p className='py-2'>Qty in Kg </p>
                                <input type="number" name="quantity" id="" min="1" max="100" defaultValue={1} className="pl-3" />
                            </div>
                            <div className='mt-4'>
                                <button type='submit' className="btn btn-primary text-white cursor-pointer hover:bg-secondary duration-500 border-none">Add to cart</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div className='overflow-x-auto mt-10 pl-4'>
                <table className='table md:w-[100%]'>
                    <caption className='text-2xl font-semibold my-4 text-left'>Product Specification</caption>
                    <thead>
                        <tr>
                            <th>Specification</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Category</td>
                            <td>
                                <p className='mt-2'> <span className='capitalize'>{singleProductData.category}</span></p>
                            </td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>
                                <p className='mt-2'>: <span className='capitalize'>{singleProductData.specifications?.weight}</span></p>
                            </td>
                        </tr>
                        <tr>
                            <td>Color</td>
                            <td>
                                <p className='mt-2'>: <span className='capitalize'>{singleProductData.specifications?.color}</span></p>
                            </td>
                        </tr>
                        <tr>
                            <td>Size</td>
                            <td>
                                <p className='mt-2'>: <span className='capitalize'>{singleProductData.specifications?.size}</span></p>
                            </td>
                        </tr>
                        <tr>
                            <td>Long</td>
                            <td>
                                <p className='mt-2'>: <span className='capitalize'>{singleProductData.specifications?.dimensions?.long}</span></p>
                            </td>
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td>
                                <p className='mt-2'>: <span className='capitalize'>{singleProductData.specifications?.dimensions?.height}</span></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='md:w-[60%]'>
                    <h2 className='text-2xl font-semibold my-4'>Description</h2>
                    <p className='text-justify'>
                        {singleProductData.fullDescription}
                    </p>
                </div>
                <div className='md:w-[60%]'>
                    <h2 className='text-2xl font-semibold my-4'>Post Your Review </h2>
                    <ReviewForm></ReviewForm>
                </div>
            </div>
        </div>
    );
};

export default SingleProductDetails;