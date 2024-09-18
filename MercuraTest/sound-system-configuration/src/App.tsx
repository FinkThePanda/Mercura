import React, { useState } from 'react';

// Eksempelproduktkatalog
const productCatalog = [
  { id: 1, name: 'Speaker A', quantity: 1 },
  { id: 2, name: 'Speaker B', quantity: 2 },
  { id: 3, name: 'System XX24', quantity: 1 },
];

const App: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<{ id: number; name: string; quantity: number }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number>(productCatalog[0].id); // Vælg første produkt som standard

  // Funktion til at tilføje et produkt til listen over valgte produkter
  const addProduct = (product: { id: number; name: string; quantity: number }) => {
    setSelectedProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <div className="min-h-screen h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white p-4 shadow-lg h-full">
        <h2 className="text-xl font-bold mb-4">Products</h2>

        {/* Valgte Produkter */}
        <div className="mb-4">
          {selectedProducts.map((product) => (
            <div key={product.id} className="border p-2 mb-2">
              {product.name} <span className="text-gray-600">[x{product.quantity}]</span>
            </div>
          ))}
        </div>

        {/* Add Product Dropdown og Knap */}
        <div className="mb-4">
          <select
            className="border p-2 mb-2 w-full"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(parseInt(e.target.value))}
          >
            {productCatalog.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <button
            className="mt-2 text-blue-600 hover:underline"
            onClick={() => {
              const productToAdd = productCatalog.find((p) => p.id === selectedProduct);
              if (productToAdd) {
                addProduct(productToAdd);
              }
            }}
          >
            + add product
          </button>
        </div>

        {/* Options */}
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2" />
            Delivery <span className="ml-auto">+ $</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Installation <span className="ml-auto">+ $</span>
          </label>
        </div>

        {/* Price and Info */}
        <div className="mt-4">
          <div className="border-t pt-2">
            <p>Price: Total</p>
            <p>Product: </p>
            <p>Add-ons: </p>
            <p>Tax: </p>
            <p>Shipment: </p>
          </div>
          <div className="mt-4">
            <p>Info:</p>
            <p>Name:</p>
            <p>Phone:</p>
            <p>Email:</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 h-full">
        <h1 className="text-3xl font-bold mb-6">Speaker A</h1>

        {/* Product Display */}
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-gray-300 p-4 text-center">
            <p>Speaker A Image</p>
          </div>
          <div className="bg-gray-300 p-4 text-center">
            <p>2x Speaker B Image</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">System XX24</h2>
          <div className="bg-gray-300 p-4 mt-4 text-center">
            <p>System Image</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
