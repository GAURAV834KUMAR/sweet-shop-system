import React from 'react';
import { Sweet } from '../types';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (sweet: Sweet) => void;
  onViewDetails?: (sweet: Sweet) => void;
  isAdmin?: boolean;
  onEdit?: (sweet: Sweet) => void;
  onDelete?: (sweet: Sweet) => void;
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet, onPurchase, onViewDetails, isAdmin, onEdit, onDelete }) => {
  const isOutOfStock = sweet.quantity === 0;
  const price = typeof sweet.price === 'string' ? parseFloat(sweet.price) : sweet.price;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Sweet Image Area with Click to View Details */}
      <div 
        className="bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 h-48 flex items-center justify-center cursor-pointer relative overflow-hidden group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-purple-200 transition-all duration-300"
        onClick={() => onViewDetails && onViewDetails(sweet)}
      >
        <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
          <div className="text-7xl mb-2 animate-float">🍬</div>
          <p className="text-sm text-purple-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click for details
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 
              className="text-xl font-bold text-gray-900 mb-1 cursor-pointer hover:text-purple-600 transition-colors"
              onClick={() => onViewDetails && onViewDetails(sweet)}
            >
              {sweet.name}
            </h3>
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-semibold rounded-full">
              {sweet.category}
            </span>
          </div>
          <div className="ml-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">${price.toFixed(2)}</span>
          </div>
        </div>

        {sweet.description && (
          <p className="text-gray-600 text-sm mb-4 overflow-hidden" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>{sweet.description}</p>
        )}

        <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
            <span className="text-sm font-medium text-gray-700">Stock:</span>
            <span className={`ml-2 font-bold text-lg ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
              {sweet.quantity}
            </span>
          </div>
          {isOutOfStock && (
            <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase tracking-wide">
              Out of Stock
            </span>
          )}
        </div>

        <div className="space-y-2">
          {/* View Details Button */}
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(sweet)}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              👁️ View Details
            </button>
          )}

          {/* Purchase Button */}
          <button
            onClick={() => onPurchase(sweet)}
            disabled={isOutOfStock}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md"
          >
            {isOutOfStock ? '🚫 Out of Stock' : '🛒 Quick Buy'}
          </button>

          {/* Admin Actions */}
          {isAdmin && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => onEdit && onEdit(sweet)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete && onDelete(sweet)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SweetCard;

