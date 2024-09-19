import React from 'react';
import {PRODUCTS } from '../data/data';
import ProductList from './ProductList';

interface SidebarProps {
  selectedProducts: any[];
  onAddProduct: (id: number, quantity: number, color: string) => void;
  onRemoveProduct: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
  onColorChange: (id: number, color: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedProducts, 
  onAddProduct, 
  onRemoveProduct, 
  onQuantityChange, 
  onColorChange
}) => {
  return (
    <div className="w-1/3 h-screen bg-[#2E2E2E] p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-[#D3D3D3]">Sonos Sound Systems</h2>
      <ProductList
        products={PRODUCTS}
        selectedProducts={selectedProducts}
        onAddProduct={onAddProduct}
        onRemoveProduct={onRemoveProduct}
        onQuantityChange={onQuantityChange}
        onColorChange={onColorChange}
      />
    </div>
  );
};

export default Sidebar;
