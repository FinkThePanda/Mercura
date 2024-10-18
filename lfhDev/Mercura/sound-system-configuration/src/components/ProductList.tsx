import React from 'react';
import { BUTTON_LABELS} from '../data/data';

interface ProductListProps {
  products: any[];
  selectedProducts: any[];
  onAddProduct: (id: number, quantity: number, color: string) => void;
  onRemoveProduct: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
  onColorChange: (id: number, color: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products, // Brug products her
  selectedProducts,
  onAddProduct, // Brug onAddProduct her
  onRemoveProduct,
  onQuantityChange,
  onColorChange
}) => {
  return (
    <div>
      {/* Liste over produkter, der kan tilføjes */}
      <h3 className="text-lg font-bold mb-2">Available Products:</h3>
      <div>
        {products.map((product) => (
          <div key={product.id} className="border p-2 mb-2 flex flex-col">
            <span className="text-[#D3D3D3]">{product.name} - {product.price} DKK</span>
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => onAddProduct(product.id, 1, 'black')} // Brug onAddProduct når et produkt tilføjes
            >
              {BUTTON_LABELS.addProduct}
            </button>
          </div>
        ))}
      </div>

      {/* Liste over allerede tilføjede produkter */}
      <h3 className="text-lg font-bold mt-4 mb-2">Selected Products:</h3>
      <div>
        {selectedProducts.map((product) => (
          <div key={product.id} className="border p-2 mb-2 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-[#D3D3D3]">{product.name} - {product.price} DKK</span>
              <input
                type="number"
                min="1"
                value={product.quantity}
                onChange={(e) => onQuantityChange(product.id, parseInt(e.target.value))}
                className="w-12 border p-1 mx-2 text-center"
              />
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => onRemoveProduct(product.id)}
              >
                {BUTTON_LABELS.removeProduct}
              </button>
            </div>

            {/* Farvevælger */}
            <div className="mt-2">
              <label className="block text-sm text-[#D3D3D3]">Color:</label>
              <select
                value={product.color}
                onChange={(e) => onColorChange(product.id, e.target.value)}
                className="border p-1 w-full text-sm bg-[#2E2E2E] text-[#D3D3D3]"
              >
                <option value="black">Black</option>
                <option value="white">White</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;