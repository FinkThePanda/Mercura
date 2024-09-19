// SlideDeck.tsx
import React, { useState } from 'react';

const SlideDeck: React.FC<{ productCatalog: { id: number; name: string; imageUrl: string }[] }> = ({ productCatalog }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productCatalog.length); // Loop til start ved slutning
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? productCatalog.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Produktbillede */}
      <img
        src={productCatalog[currentIndex].imageUrl}
        alt={productCatalog[currentIndex].name}
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
