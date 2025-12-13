import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { sweetsAPI } from '../services/api';
import { Sweet } from '../types';
import SweetCard from '../components/SweetCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [purchaseQuantity, setPurchaseQuantity] = useState<{ [key: string]: number }>({});
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null);

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetsAPI.getAll();
      setSweets(data);
      setFilteredSweets(data);
    } catch (err: any) {
      toast.error('Failed to load sweets');
    } finally {
      setLoading(false);
    }
  };

  const filterSweets = React.useCallback(() => {
    let filtered = [...sweets];

    // Filter by search term (name)
    if (searchTerm) {
      filtered = filtered.filter(sweet =>
        sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(sweet =>
        sweet.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Filter by price range
    if (priceRange.min) {
      filtered = filtered.filter(sweet => sweet.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(sweet => sweet.price <= Number(priceRange.max));
    }

    setFilteredSweets(filtered);
  }, [sweets, searchTerm, categoryFilter, priceRange]);

  useEffect(() => {
    filterSweets();
  }, [filterSweets]);

  const handlePurchaseClick = (sweet: Sweet) => {
    setSelectedSweet(sweet);
    setPurchaseQuantity({ ...purchaseQuantity, [sweet.id]: 1 });
    setShowPurchaseModal(true);
  };

  const handlePurchaseConfirm = async () => {
    if (!selectedSweet) return;

    const quantity = purchaseQuantity[selectedSweet.id] || 1;
    const totalCost = (typeof selectedSweet.price === 'string' ? parseFloat(selectedSweet.price) : selectedSweet.price) * quantity;

    try {
      await sweetsAPI.purchase(selectedSweet.id, { quantity });
      setShowPurchaseModal(false);
      const sweetName = selectedSweet.name;
      setSelectedSweet(null);
      await fetchSweets();
      toast.success(`🎉 Successfully purchased ${quantity} ${sweetName}(s) for $${totalCost.toFixed(2)}!`, {
        position: "top-right",
        autoClose: 4000,
      });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Purchase failed', {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading sweets...</div>
      </div>
    );
  }

  const categories = Array.from(new Set(sweets.map(sweet => sweet.category)));

  return (
    <div className="space-y-6">
      <ToastContainer />
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sweet Shop</h1>
          <p className="text-gray-600 mt-1">Browse and purchase delicious sweets</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search by Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Filter by Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
            <input
              type="number"
              placeholder="$0"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
            <input
              type="number"
              placeholder="$100"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            setSearchTerm('');
            setCategoryFilter('');
            setPriceRange({ min: '', max: '' });
          }}
          className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Clear all filters
        </button>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 font-medium">
        Showing {filteredSweets.length} of {sweets.length} sweets
      </div>

      {/* Sweets Grid */}
      {filteredSweets.length === 0 && !loading ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <div className="text-6xl mb-4">🍬</div>
          <p className="text-gray-700 text-xl font-semibold mb-2">No sweets found</p>
          <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('');
              setPriceRange({ min: '', max: '' });
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSweets.map(sweet => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              onPurchase={handlePurchaseClick}
            />
          ))}
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && selectedSweet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">Purchase {selectedSweet.name}</h3>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Price: ${(typeof selectedSweet.price === 'string' ? parseFloat(selectedSweet.price) : selectedSweet.price).toFixed(2)}</p>
              <p className="text-gray-600 mb-4">Available: {selectedSweet.quantity} items</p>

              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                max={selectedSweet.quantity}
                value={purchaseQuantity[selectedSweet.id] || 1}
                onChange={(e) => setPurchaseQuantity({
                  ...purchaseQuantity,
                  [selectedSweet.id]: Number(e.target.value)
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />

              <p className="mt-2 text-lg font-semibold">
                Total: ${((purchaseQuantity[selectedSweet.id] || 1) * selectedSweet.price).toFixed(2)}
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handlePurchaseConfirm}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                Confirm Purchase
              </button>
              <button
                onClick={() => {
                  setShowPurchaseModal(false);
                  setSelectedSweet(null);
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
