import { useState } from 'react';

interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: {
    name: string;
    description: string;
    price: number;
    stock: number;
  }) => void;
}

export function AddProductDialog({
  isOpen,
  onClose,
  onConfirm,
}: AddProductDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleConfirm = () => {
    onConfirm({
      name,
      description,
      price,
      stock,
    });
    setName('');
    setDescription('');
    setPrice(0);
    setStock(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">
          Adicionar Novo Produto
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nome do Produto
            </label>
            <input
              type="text"
              placeholder="Ex: Camiseta DEV"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Descrição
            </label>
            <input
              type="text"
              placeholder="Ex: Camiseta de alta qualidade"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Preço
            </label>
            <input
              type="number"
              placeholder="Ex: 10000"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Estoque
            </label>
            <input
              type="number"
              placeholder="Ex: 10"
              value={stock}
              onChange={e => setStock(Number(e.target.value))}
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
            onClick={handleConfirm}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
