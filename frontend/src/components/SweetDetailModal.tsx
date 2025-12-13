import React, { useState } from 'react';
import { Sweet } from '../types';

interface SweetDetailModalProps {
  sweet: Sweet;
  onClose: () => void;
  onPurchase: (quantity: number) => void;
}

const SweetDetailModal: React.FC<SweetDetailModalProps> = ({ sweet, onClose, onPurchase }) => {
  const [quantity, setQuantity] = useState(1);
  const price = typeof sweet.price === 'string' ? parseFloat(sweet.price) : sweet.price;
  const totalPrice = price * quantity;
  const isOutOfStock = sweet.quantity === 0;

  const handlePurchase = () => {
    onPurchase(quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex-1 pr-12">
            <h2 className="text-3xl font-bold text-white mb-2">{sweet.name}</h2>
            <span className="inline-block px-4 py-1 bg-white bg-opacity-20 text-white text-sm font-semibold rounded-full backdrop-blur-sm">
              {sweet.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Image & Basic Info */}
            <div className="space-y-6">
              {/* Sweet Image Placeholder */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-12 flex items-center justify-center h-64 transform hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-bounce-slow">🍬</div>
                  <p className="text-gray-600 font-medium">Premium Sweet</p>
                </div>
              </div>

              {/* Price & Stock Info */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 space-y-4 shadow-md">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Price:</span>
                  <span className="text-3xl font-bold text-purple-600">${price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">In Stock:</span>
                  <span className={`text-xl font-bold ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
                    {sweet.quantity} units
                  </span>
                </div>
                {isOutOfStock && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 text-center">
                    <span className="text-red-800 font-semibold">⚠️ Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Details & Actions */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {sweet.description || 'A delightful sweet treat crafted with premium ingredients. Perfect for any occasion, whether as a gift or a personal indulgence. Experience the perfect balance of flavor and quality in every bite.'}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Features
                </h3>
                <ul className="space-y-2">
                  {[
                    'Premium quality ingredients',
                    'Freshly made daily',
                    'Perfect for gifting',
                    'Satisfaction guaranteed'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Purchase Section */}
              <div className="bg-purple-50 rounded-xl p-6 space-y-4 border-2 border-purple-100">
                <h3 className="text-xl font-bold text-gray-900">Purchase Now</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={sweet.quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(Math.max(1, Number(e.target.value)), sweet.quantity))}
                    disabled={isOutOfStock}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Unit Price:</span>
                    <span className="font-semibold">${price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold">{quantity}</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total:</span>
                      <span className="text-2xl font-bold text-purple-600">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePurchase}
                  disabled={isOutOfStock}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-lg"
                >
                  {isOutOfStock ? '🚫 Out of Stock' : '🛒 Add to Cart'}
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 border-t-2 border-gray-200 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-2">🚚</div>
                <h4 className="font-bold text-gray-900 mb-1">Fast Delivery</h4>
                <p className="text-sm text-gray-600">Quick and reliable shipping</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-2">✨</div>
                <h4 className="font-bold text-gray-900 mb-1">Fresh Quality</h4>
                <p className="text-sm text-gray-600">Made with care every day</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-2">💝</div>
                <h4 className="font-bold text-gray-900 mb-1">Perfect Gift</h4>
                <p className="text-sm text-gray-600">Ideal for any celebration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default SweetDetailModal;
