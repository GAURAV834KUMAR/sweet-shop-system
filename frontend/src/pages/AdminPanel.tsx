import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sweetsAPI } from '../services/api';
import { Sweet, CreateSweetRequest } from '../types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel: React.FC = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [deletingSweet, setDeletingSweet] = useState<Sweet | null>(null);
  const [restockingSweet, setRestockingSweet] = useState<Sweet | null>(null);
  const [restockQuantity, setRestockQuantity] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'quantity'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [formData, setFormData] = useState<CreateSweetRequest>({
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    description: '',
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    fetchSweets();
  }, [isAdmin, navigate]);

  useEffect(() => {
    let filtered = [...sweets];

    // Search
    if (searchTerm) {
      filtered = filtered.filter(sweet =>
        sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sweet.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === 'price') {
        aVal = typeof aVal === 'string' ? parseFloat(aVal) : aVal;
        bVal = typeof bVal === 'string' ? parseFloat(bVal) : bVal;
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredSweets(filtered);
  }, [sweets, searchTerm, sortBy, sortOrder]);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetsAPI.getAll();
      setSweets(data);
    } catch (err) {
      toast.error('Failed to load sweets');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    });
  };

  const handleCreate = () => {
    setEditingSweet(null);
    setFormData({
      name: '',
      category: '',
      price: 0,
      quantity: 0,
      description: '',
    });
    setShowModal(true);
  };

  const handleEdit = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: typeof sweet.price === 'string' ? parseFloat(sweet.price) : sweet.price,
      quantity: sweet.quantity,
      description: sweet.description || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingSweet) {
        await sweetsAPI.update(editingSweet.id, formData);
        toast.success(`✅ ${formData.name} updated successfully!`);
      } else {
        await sweetsAPI.create(formData);
        toast.success(`✅ ${formData.name} created successfully!`);
      }
      setShowModal(false);
      fetchSweets();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDeleteClick = (sweet: Sweet) => {
    setDeletingSweet(sweet);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingSweet) return;

    try {
      await sweetsAPI.delete(deletingSweet.id);
      toast.success(`🗑️ ${deletingSweet.name} deleted successfully!`);
      setShowDeleteModal(false);
      setDeletingSweet(null);
      fetchSweets();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleRestockClick = (sweet: Sweet) => {
    setRestockingSweet(sweet);
    setRestockQuantity(10); // Default restock amount
    setShowRestockModal(true);
  };

  const handleRestockConfirm = async () => {
    if (!restockingSweet || restockQuantity <= 0) return;

    try {
      await sweetsAPI.restock(restockingSweet.id, { quantity: restockQuantity });
      toast.success(`📦 ${restockingSweet.name} restocked with ${restockQuantity} items!`);
      setShowRestockModal(false);
      setRestockingSweet(null);
      setRestockQuantity(0);
      fetchSweets();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Restock failed');
    }
  };

  const handleSort = (column: 'name' | 'price' | 'quantity') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Statistics
  const totalSweets = sweets.length;
  const totalStock = sweets.reduce((sum, sweet) => sum + sweet.quantity, 0);
  const lowStockItems = sweets.filter(sweet => sweet.quantity > 0 && sweet.quantity <= 5).length;
  const outOfStockItems = sweets.filter(sweet => sweet.quantity === 0).length;
  const totalValue = sweets.reduce((sum, sweet) => {
    const price = typeof sweet.price === 'string' ? parseFloat(sweet.price) : sweet.price;
    return sum + (price * sweet.quantity);
  }, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-10 transform -skew-y-6"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-5xl font-bold mb-2 flex items-center">
              👑 Admin Panel
            </h1>
            <p className="text-purple-100 text-lg">Manage your sweet shop inventory with ease</p>
          </div>
          <button
            onClick={handleCreate}
            className="bg-white text-purple-600 hover:bg-purple-50 font-bold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-xl flex items-center gap-3 group"
          >
            <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
            <span className="text-lg">Add New Sweet</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-sm font-medium opacity-90">Total Sweets</div>
          <div className="text-3xl font-bold mt-2">{totalSweets}</div>
          <div className="text-xs opacity-75 mt-1">Unique items</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-sm font-medium opacity-90">Total Stock</div>
          <div className="text-3xl font-bold mt-2">{totalStock}</div>
          <div className="text-xs opacity-75 mt-1">Items in inventory</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-sm font-medium opacity-90">Inventory Value</div>
          <div className="text-3xl font-bold mt-2">${totalValue.toFixed(2)}</div>
          <div className="text-xs opacity-75 mt-1">Total worth</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-sm font-medium opacity-90">Low Stock</div>
          <div className="text-3xl font-bold mt-2">{lowStockItems}</div>
          <div className="text-xs opacity-75 mt-1">≤5 items remaining</div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-sm font-medium opacity-90">Out of Stock</div>
          <div className="text-3xl font-bold mt-2">{outOfStockItems}</div>
          <div className="text-xs opacity-75 mt-1">Needs restock</div>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleSort('name')}
              className={`px-4 py-3 rounded-lg font-medium transition ${
                sortBy === 'name'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('price')}
              className={`px-4 py-3 rounded-lg font-medium transition ${
                sortBy === 'price'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('quantity')}
              className={`px-4 py-3 rounded-lg font-medium transition ${
                sortBy === 'quantity'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Stock {sortBy === 'quantity' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>

      {/* Sweets Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Sweet
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSweets.map((sweet) => (
                <tr key={sweet.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">{sweet.name}</div>
                    {sweet.description && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {sweet.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      {sweet.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    ${(typeof sweet.price === 'string' ? parseFloat(sweet.price) : sweet.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-lg font-bold ${
                      sweet.quantity === 0 ? 'text-red-600' :
                      sweet.quantity <= 5 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {sweet.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {sweet.quantity === 0 ? (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-red-100 text-red-800">
                        Out of Stock
                      </span>
                    ) : sweet.quantity <= 5 ? (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-yellow-100 text-yellow-800">
                        Low Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800">
                        In Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(sweet)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRestockClick(sweet)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-medium"
                      >
                        Restock
                      </button>
                      <button
                        onClick={() => handleDeleteClick(sweet)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSweets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 text-lg font-semibold">No sweets found</p>
            <p className="text-gray-400">Try adjusting your search or add new sweets</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 rounded-t-xl">
              <h3 className="text-2xl font-bold text-white">
                {editingSweet ? '✏️ Edit Sweet' : '➕ Add New Sweet'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sweet Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Chocolate Bar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Chocolate, Candy, Gummies"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Optional: Add a description for this sweet"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition"
                >
                  {editingSweet ? 'Update Sweet' : 'Create Sweet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingSweet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Sweet?</h3>
                <p className="text-gray-600">
                  Are you sure you want to delete <span className="font-bold">{deletingSweet.name}</span>?
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Restock Modal */}
      {showRestockModal && restockingSweet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-t-xl">
              <h3 className="text-2xl font-bold text-white">📦 Restock {restockingSweet.name}</h3>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Current stock: <span className="font-bold text-gray-900">{restockingSweet.quantity}</span> items
              </p>

              <label className="block text-sm font-semibold text-gray-700 mb-2">Add Quantity</label>
              <input
                type="number"
                value={restockQuantity}
                onChange={(e) => setRestockQuantity(Number(e.target.value))}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                placeholder="Enter quantity to add"
              />

              <p className="text-sm text-gray-500 mb-6">
                New stock will be: <span className="font-bold text-green-600">
                  {restockingSweet.quantity + restockQuantity}
                </span> items
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRestockModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRestockConfirm}
                  disabled={restockQuantity <= 0}
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Restock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
