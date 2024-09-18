import React, { useState } from 'react';

// Eksempelproduktkatalog
const productCatalog = [
  { id: 1, name: 'Speaker A' },
  { id: 2, name: 'Speaker B' },
  { id: 3, name: 'Speaker C' },
  { id: 4, name: 'Speaker D' },
  { id: 5, name: 'System XX24' },
  { id: 6, name: 'System XX20' },

];

// Farvevalg
const availableColors = ["Red", "Blue", "Green", "Black", "White"];

const App: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<{ id: number; name: string; quantity: number; color: string }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number>(productCatalog[0].id); // Vælg første produkt som standard

  // Tilstand til at gemme kundeoplysninger
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Funktion til at opdatere kundeoplysninger
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Funktion til at gemme oplysninger
  const saveCustomerInfo = () => {
    console.log("Customer Info Saved:", customerInfo);
    // Her kan dataene sendes til en server eller gemmes i lokal storage
  };

  // Funktion til at tilføje et produkt til listen over valgte produkter
  const addProduct = (product: { id: number; name: string }) => {
    setSelectedProducts((prevProducts) => [...prevProducts, { ...product, quantity: 1, color: availableColors[0] }]); // Tilføjer produktet med standard quantity på 1 og default color
  };

  // Funktion til at fjerne et produkt fra listen
  const removeProduct = (productId: number) => {
    setSelectedProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  // Funktion til at opdatere antallet af et produkt
  const updateProductQuantity = (productId: number, newQuantity: number) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  // Funktion til at opdatere farven af et produkt
  const updateProductColor = (productId: number, newColor: string) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, color: newColor } : product
      )
    );
  };

  // Filtrér produktkataloget, så kun produkter der ikke er tilføjet, vises
  const availableProducts = productCatalog.filter(
    (product) => !selectedProducts.some((selectedProduct) => selectedProduct.id === product.id)
  );

  return (
    <div className="min-h-screen h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white p-4 shadow-lg h-full overflow-y-scroll">
        <h2 className="text-xl font-bold mb-4">Cool Sound Systems</h2>

        {/* Valgte Produkter */}
        <div className="mb-4">
          {selectedProducts.map((product) => (
            <div key={product.id} className="border p-2 mb-2 flex flex-col">
              <div className="flex justify-between items-center">
                <span>{product.name}</span>
                {/* Input for at ændre mængden af produktet */}
                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) => updateProductQuantity(product.id, parseInt(e.target.value))}
                  className="w-12 border p-1 mx-2 text-center"
                />
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeProduct(product.id)}
                >
                  Remove
                </button>
              </div>

              {/* Farvevælger for hvert produkt */}
              <div className="mt-2">
                <label className="block text-sm">Color:</label>
                <select
                  value={product.color}
                  onChange={(e) => updateProductColor(product.id, e.target.value)}
                  className="border p-1 w-full text-sm"
                >
                  {availableColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
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
            {availableProducts.map((product) => (
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
            disabled={availableProducts.length === 0} // Disabler knappen hvis alle produkter er tilføjet
          >
            + add product
          </button>
        </div>

        {/* Options */}
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2" />
            Delivery <span className="ml-auto">+ 150 dkk</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Installation <span className="ml-auto">+ 500 dkk</span>
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
          
          {/* Customer Info Form */}
          <div className="mt-4">
            <h3 className="font-bold mb-2">Customer Info</h3>
            <div className="mb-2">
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleCustomerInfoChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Phone:</label>
              <input
                type="tel"
                name="phone"
                value={customerInfo.phone}
                onChange={handleCustomerInfoChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleCustomerInfoChange}
                className="border p-2 w-full"
              />
            </div>
            <button
              onClick={saveCustomerInfo}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Save Info
            </button>
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