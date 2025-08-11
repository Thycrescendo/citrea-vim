import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface Option {
  id: number;
  type: 'Call' | 'Put';
  strikePrice: number;
  expiry: string;
  premium: number;
  liquidity: number;
}

interface TradeModalProps {
  option: Option | null;
  isOpen: boolean;
  onClose: () => void;
  onTrade: (option: Option, quantity: number) => void;
}

const TradeModal: React.FC<TradeModalProps> = ({ option, isOpen, onClose, onTrade }) => {
  const [amount, setAmount] = useState<number>(0);
  const [action, setAction] = useState<'Buy' | 'Sell'>('Buy');

  const handleTrade = () => {
    if (option) {
      onTrade(option, amount);
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-left">
                <Dialog.Title as="h3" className="text-lg font-semibold text-teal-300">
                  Trade {option?.type} Option #{option?.id}
                </Dialog.Title>
                <div className="mt-4 space-y-2 text-teal-300">
                  <p>Strike Price: ${option?.strikePrice.toLocaleString()}</p>
                  <p>Expiry: {option?.expiry}</p>
                  <p>Premium: {option?.premium} cBTC</p>
                  <label className="block">
                    Quantity:
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="mt-1 w-full p-2 bg-gray-700 text-white rounded-lg"
                      min="0"
                      step="0.01"
                    />
                  </label>
                  <div className="flex space-x-4 mt-2">
                    <button
                      onClick={() => setAction('Buy')}
                      className={`flex-1 py-2 rounded-lg ${action === 'Buy' ? 'bg-teal-500 text-gray-900' : 'bg-gray-600 text-gray-300'}`}
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => setAction('Sell')}
                      className={`flex-1 py-2 rounded-lg ${action === 'Sell' ? 'bg-teal-500 text-gray-900' : 'bg-gray-600 text-gray-300'}`}
                    >
                      Sell
                    </button>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTrade}
                    className="px-4 py-2 bg-teal-500 text-gray-900 rounded-lg hover:bg-teal-600"
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TradeModal;