import React from 'react';
import { useLoaderData } from 'react-router-dom';
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
                <div className='lg:text-left text-center'>
                    <h2 className='lg:text-5xl text-3xl font-bold  lg:mt-16 lg:my-6 my-4'>{singleProductData.name}</h2>
                    <h3 className='font-bold text-3xl'>${singleProductData.price}</h3>
                    <div className='py-4'>
                        <p>Category: <span className='capitalize'>{singleProductData.category}</span></p>
                        <p>Ratting : {singleProductData.rate} </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProductDetails;