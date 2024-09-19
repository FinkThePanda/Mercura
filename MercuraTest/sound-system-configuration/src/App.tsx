import React, { useState, useEffect } from 'react';
import SlideDeck from './components/SlideDeck'; // Importer SlideDeck-komponenten

// Eksempelproduktkatalog
const productCatalog = [
  { id: 1, name: 'Roam 2', price: 1499, colorImages: { black: 'public/images/Roam-2-black.webp', white: 'public/images/Roam-2-white.webp' }},
  { id: 2, name: 'Era 100', price: 1679, colorImages: { black: 'public/images/Era-100-black.webp', white: 'public/images/Era-100-white.webp' } },
  { id: 3, name: 'Era 300', price: 3699, colorImages: { black: 'public/images/Era-300-black.webp', white: 'public/images/Era-300-white.webp' } },
  { id: 4, name: 'Five', price: 4899, colorImages: { black: 'public/images/Five-black.webp', white: 'public/images/Five-white.webp' } },
  { id: 5, name: 'Move 2', price: 3699, colorImages: { black: 'public/images/Move-2-black.webp', white: 'public/images/Move-2-white.webp' } },
];

// Farvevalg
const availableColors = ["", "Black", "White"]; // Include an empty string for no selection

const TAX_RATE = 0.25; // 25% moms

const App: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<{ id: number; name: string; quantity: number; color: string; price: number }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null); // Start with no product selected
  const [selectedColor, setSelectedColor] = useState<string>(""); // Start with no color selected
  const [quantity, setQuantity] = useState<number>(1); // Default quantity is 1

  const [delivery, setDelivery] = useState<boolean>(false); // Delivery option
  const [installation, setInstallation] = useState<boolean>(false); // Installation option
  const [productsTotal, setProductsTotal] = useState<number>(0); // Total price for products
  const [tax, setTax] = useState<number>(0); // Tax amount
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0); // Delivery price
  const [installationPrice, setInstallationPrice] = useState<number>(0); // Installation price
  const [totalPrice, setTotalPrice] = useState<number>(0); // Grand total price
  const [errors, setErrors] = useState<string[]>([]); // Holds validation errors

  // Tilstand til at gemme kundeoplysninger
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Tilstand til at aktivere/deaktivere "Bestil"-knappen
  const [canPlaceOrder, setCanPlaceOrder] = useState<boolean>(false);

  // Funktion til at opdatere kundeoplysninger
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Funktion til at tilføje et produkt til listen over valgte produkter
  const addProduct = () => {
    setErrors([]); // Reset error messages

    const newErrors = [];
    if (!selectedProduct) {
      newErrors.push("Please select a product.");
    }
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      newErrors.push("Quantity must be a positive integer.");
    }
    if (!selectedColor) {
      newErrors.push("Please select a color.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const productToAdd = productCatalog.find((p) => p.id === selectedProduct);
    if (productToAdd) {
      setSelectedProducts((prevProducts) => [
        ...prevProducts,
        { ...productToAdd, quantity: quantity, color: selectedColor },
      ]);
    }
  };

  // Funktion til at fjerne et produkt fra listen
  const removeProduct = (productId: number) => {
    setSelectedProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  // Funktion til at opdatere antallet af et produkt
  const updateProductQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity > 0 && Number.isInteger(newQuantity)) {
      setSelectedProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, quantity: newQuantity } : product
        )
      );
    } else {
      setErrors([...errors, "Quantity must be a positive integer."]);
    }
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

  // Funktion til at beregne priskomponenterne og den samlede pris
  const calculatePrices = () => {
    const productsPrice = selectedProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    const taxAmount = productsPrice * TAX_RATE;
    const deliveryPrice = delivery ? 150 : 0;
    const installationPrice = installation ? 500 : 0;
    const grandTotal = productsPrice + taxAmount + deliveryPrice + installationPrice;

    setProductsTotal(productsPrice);
    setTax(taxAmount);
    setDeliveryPrice(deliveryPrice);
    setInstallationPrice(installationPrice);
    setTotalPrice(grandTotal);
  };

  // Beregn priser hver gang der ændres i kurven
  useEffect(() => {
    calculatePrices();
  }, [selectedProducts, delivery, installation]);

  // Funktion til at tjekke, om kundeinfo er udfyldt
  const isCustomerInfoValid = () => {
    const { name, phone, email } = customerInfo;
    return name.trim() !== '' && phone.trim() !== '' && email.trim() !== '';
  };

  // Tjek om "Bestil"-knappen skal aktiveres
  useEffect(() => {
    setCanPlaceOrder(selectedProducts.length > 0 && isCustomerInfoValid());
  }, [selectedProducts, customerInfo]);

  // Funktion til at bestille produkter
  const placeOrder = () => {
    if (canPlaceOrder) {
      alert("Order placed successfully!");
      // Her kan du sende data til backend eller lave en anden handling
    }
  };

  return (
    <div className="min-h-screen h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-[#2E2E2E] p-4 shadow-lg h-full overflow-y-scroll">
        <h2 className="text-xl font-bold mb-4 text-[#D3D3D3]">Sonos Sound Systems</h2>

        {/* Valideringsfejl */}
        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-2 mb-4">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))} 
            </ul>
          </div>
        )}

        {/* Add Product Dropdown og Knap */}
        <div className="mb-4">
          <select
            className="border p-2 mb-2 w-full bg-[#2E2E2E] text-[#D3D3D3]"
            value={selectedProduct ?? ""}
            onChange={(e) => setSelectedProduct(parseInt(e.target.value))}
          >
            <option value="" disabled className="text-[#D3D3D3]">
              Select a product
            </option>
            {availableProducts.map((product) => (
              <option key={product.id} value={product.id} className="text-[#D3D3D3]">
                {product.name}
              </option>
            ))}
          </select>

          {/* Farvevælger før tilføjelse */}
          <div className="mb-2">
            <label className="block text-[#D3D3D3]">Choose Color:</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="border p-2 w-full bg-[#2E2E2E] text-[#D3D3D3]"
            >
              {availableColors.map((color) => (
                <option key={color} value={color}>
                  {color || "Select color"}
                </option>
              ))}
            </select>
          </div>

          {/* Antal */}
          <div className="mb-2">
            <label className="block text-[#D3D3D3]">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border p-2 w-full text-center bg-[#2E2E2E] text-[#D3D3D3]"
            />
          </div>

          <button
            className="mt-2 text-[#3498DB] hover:text-[#1ABC9C]"
            onClick={addProduct}
          >
            + add product
          </button>
        </div>

        {/* Valgte Produkter */}
        <div className="mb-4">
          {selectedProducts.map((product) => (
            <div key={product.id} className="border p-2 mb-2 flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-[#D3D3D3]">{product.name} - {product.price} DKK</span>
                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) => updateProductQuantity(product.id, parseInt(e.target.value))}
                  className="w-12 border p-1 mx-2 text-center bg-[#2E2E2E] text-[#D3D3D3]"
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
                <label className="block text-sm text-[#D3D3D3]">Color:</label>
                <select
                  value={product.color}
                  onChange={(e) => updateProductColor(product.id, e.target.value)}
                  className="border p-1 w-full text-sm bg-[#2E2E2E] text-[#D3D3D3]"
                >
                  {availableColors.map((color) => (
                    <option key={color} value={color}>
                      {color || "Select color"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Options */}
        <div className="mb-4">
          <label className="flex items-center mb-2 text-[#D3D3D3]">
            <input
              type="checkbox"
              className="mr-2"
              checked={delivery}
              onChange={() => setDelivery(!delivery)}
            />
            Delivery <span className="ml-auto">+ 150 dkk</span>
          </label>
          <label className="flex items-center text-[#D3D3D3]">
            <input
              type="checkbox"
              className="mr-2"
              checked={installation}
              onChange={() => setInstallation(!installation)}
            />
            Installation <span className="ml-auto">+ 500 dkk</span>
          </label>
        </div>

        {/* Price and Info */}
        <div className="mt-4">
          <div className="border-t pt-2">
            <h3 className="font-bold text-[#D3D3D3]">Price Breakdown:</h3>
            <p className="text-[#D3D3D3]">Products: {productsTotal} DKK</p>
            <p className="text-[#D3D3D3]">Tax: {tax.toFixed(2)} DKK</p>
            <p className="text-[#D3D3D3]">Delivery: {deliveryPrice} DKK</p>
            <p className="text-[#D3D3D3]">Installation: {installationPrice} DKK</p>
            <p className="font-bold mt-2 text-[#D3D3D3]">Total: {totalPrice} DKK</p>
          </div>

          {/* Customer Info Form */}
          <div className="mt-4">
            <h3 className="font-bold mb-2 text-[#D3D3D3]">Customer Info</h3>
            <div className="mb-2">
              <label className="block mb-1 text-[#D3D3D3]">Name:</label>
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleCustomerInfoChange}
                className="border p-2 w-full bg-[#2E2E2E] text-[#D3D3D3]"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-[#D3D3D3]">Phone:</label>
              <input
                type="tel"
                name="phone"
                value={customerInfo.phone}
                onChange={handleCustomerInfoChange}
                className="border p-2 w-full bg-[#2E2E2E] text-[#D3D3D3]"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-[#D3D3D3]">Email:</label>
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleCustomerInfoChange}
                className="border p-2 w-full bg-[#2E2E2E] text-[#D3D3D3]"
              />
            </div>
          </div>
        </div>

        {/* Bestil-knap */}
        <div className="mt-4">
          <button
            className={`w-full p-2 text-white rounded ${
              canPlaceOrder ? "bg-[#1ABC9C] hover:bg-[#3498DB]" : "bg-gray-300"
            }`}
            disabled={!canPlaceOrder} // Disable knap hvis ikke muligt at bestille
            onClick={placeOrder}
          >
            Bestil
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 h-full max-h-screen overflow-auto">
        {/* SlideDeck visning */}
        <div className="w-full h-full flex flex-col justify-start items-center">
          <h2 className="text-2xl font-bold mb-4">Product Gallery</h2> {/* Product Heading */}
          <div className="w-full flex justify-center items-center flex-col">
            <div className="w-full max-w-xl h-auto">
              <SlideDeck productCatalog={productCatalog} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
