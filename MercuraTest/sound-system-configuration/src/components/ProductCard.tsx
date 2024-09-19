import React from 'react';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    colorImages: {
        black: string;
        white: string;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, colorImages }) => {
    return (
        <div className="product-card">
            <h2>{name}</h2>
            <p>Price: {price} DKK</p>
            <div className="product-images">
                <img src={colorImages.black} alt={`${name} black`} />
                <img src={colorImages.white} alt={`${name} white`} />
            </div>
        </div>
    );
};

export default ProductCard;