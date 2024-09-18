// src/App.tsx
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white p-4 shadow-lg h-full">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        
        {/* Product List */}
        <div className="mb-4">
          <div className="border p-2 mb-2">Speaker A <span className="text-gray-600">[x1]</span></div>
          <div className="border p-2 mb-2">Speaker B <span className="text-gray-600">[x2]</span></div>
          <div className="border p-2">System XX24 <span className="text-gray-600">[x1]</span></div>
          <button className="mt-2 text-blue-600 hover:underline">+ add products</button>
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
