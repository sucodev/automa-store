import { Product } from '@/interface/Product';
import React, { useState, useEffect } from 'react';

export const UpdateProductDialog = ({
  isOpen,
  onClose,
  onConfirm,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: Product) => void;
  product: Product | null;
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
    }
  }, [product]);

  const handleSubmit = () => {
    if (product) {
      const updatedProduct = {
        ...product,
        name,
        price,
        stock,
      };
      onConfirm(updatedProduct);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Editar Produto</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Preço
            </label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(parseFloat(e.target.value))}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Estoque
            </label>
            <input
              type="number"
              value={stock}
              onChange={e => setStock(parseInt(e.target.value))}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
