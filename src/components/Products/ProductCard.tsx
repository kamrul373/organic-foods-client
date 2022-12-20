import React from 'react';
type productProps = {
    product: {
        _id: string,
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
}
const ProductCard = ({ product }: productProps) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={product.coverImage} alt={product.name} className="h-48" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{product.name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;