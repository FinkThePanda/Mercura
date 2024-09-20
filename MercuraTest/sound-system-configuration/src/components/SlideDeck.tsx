import React, { useState } from 'react';

const SlideDeck: React.FC<{ productCatalog: { id: number; name: string; colorImages: { black: string; white: string } }[] }> = ({ productCatalog }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black'); // Standard farve er sort

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productCatalog.length); // Loop tilbage til start ved slutning
    setSelectedColor('black'); // Nulstil farvevalg når man skifter produkt
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? productCatalog.length - 1 : prevIndex - 1
    );
    setSelectedColor('black'); // Nulstil farvevalg når man skifter produkt
  };

  // Vælg farve for produkt
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const currentProduct = productCatalog[currentIndex];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Overskrift til produktnavn */}
      <h2 className="text-2xl font-bold mb-4" style={{ color: 'black' }}>{currentProduct.name}</h2> {/* Dynamisk overskrift */}

      {/* Farvevælger */}
      <div className="absolute top-0 right-0 mt-2 mr-2 flex space-x-2">
        <button
          className={`w-6 h-6 rounded-full border ${selectedColor === 'black' ? 'border-black' : ''}`}
          style={{ backgroundColor: 'black' }}
          onClick={() => handleColorChange('black')}
        />
        <button
          className={`w-6 h-6 rounded-full border ${selectedColor === 'white' ? 'border-black' : ''}`}
          style={{ backgroundColor: 'white' }}
          onClick={() => handleColorChange('white')}
        />
      </div>

      {/* Produktbillede baseret på valgt farve */}
      <img
        src={currentProduct.colorImages[selectedColor as 'black' | 'white']} // Type casting til 'black' | 'white'
        alt={currentProduct.name}
        className="w-full h-full object-cover"
      />

      {/* Venstre pil */}
      <button
        onClick={handlePrev}
        className="absolute left-0 p-2 bg-transparent text-white hover:bg-gray-500 hover:bg-opacity-50 transition-all rounded-full focus:outline-none"
      >
        &#10094;
      </button>

      {/* Højre pil */}
      <button
        onClick={handleNext}
        className="absolute right-0 p-2 bg-transparent text-white hover:bg-gray-500 hover:bg-opacity-50 transition-all rounded-full focus:outline-none"
      >
        &#10095;
      </button>
    </div>
  );
};

export default SlideDeck;
