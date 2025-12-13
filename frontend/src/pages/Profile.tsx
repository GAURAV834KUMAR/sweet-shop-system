import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Animated Header with Gradient */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-10 transform -skew-y-6"></div>
        <div className="relative z-10 flex items-center">
          <div className="bg-white bg-opacity-20 rounded-full p-6 mr-6 backdrop-blur-sm transform hover:scale-110 transition-transform duration-300">
            <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-2">My Profile</h1>
            <p className="text-purple-100 text-lg">Welcome back, {user.firstName}! 👋</p>
          </div>
          <div className="hidden md:block text-6xl animate-bounce-slow">
            🍬
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Account Status</h3>
            <span className="text-4xl">✅</span>
          </div>
          <p className="text-3xl font-bold">Active</p>
          <p className="text-xs text-blue-100 mt-2">Account in good standing</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Member Since</h3>
            <span className="text-4xl">📅</span>
          </div>
          <p className="text-3xl font-bold">2025</p>
          <p className="text-xs text-purple-100 mt-2">Valued customer</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Role</h3>
            <span className="text-4xl">{user.role === 'admin' ? '👑' : '👤'}</span>
          </div>
          <p className="text-3xl font-bold capitalize">{user.role}</p>
          <p className="text-xs text-pink-100 mt-2">{user.role === 'admin' ? 'Full access' : 'Shopping access'}</p>
        </div>
      </div>

      {/* Account Information Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <svg className="w-8 h-8 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Account Information
          </h2>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group">
              <label className="flex text-sm font-medium text-gray-500 mb-2 items-center">
                <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                First Name
              </label>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-2 border-gray-200 group-hover:border-purple-300 transition-colors">
                <p className="text-xl font-semibold text-gray-900">{user.firstName}</p>
              </div>
            </div>
            <div className="group">
              <label className="flex text-sm font-medium text-gray-500 mb-2 items-center">
                <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Last Name
              </label>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-2 border-gray-200 group-hover:border-purple-300 transition-colors">
                <p className="text-xl font-semibold text-gray-900">{user.lastName}</p>
              </div>
            </div>
            <div className="group">
              <label className="flex text-sm font-medium text-gray-500 mb-2 items-center">
                <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </label>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-2 border-gray-200 group-hover:border-purple-300 transition-colors">
                <p className="text-xl font-semibold text-gray-900">{user.email}</p>
              </div>
            </div>
            <div className="group">
              <label className="flex text-sm font-medium text-gray-500 mb-2 items-center">
                <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Account Role
              </label>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-2 border-gray-200 group-hover:border-purple-300 transition-colors">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                  user.role === 'admin' 
                    ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-2 border-purple-300' 
                    : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-2 border-blue-300'
                }`}>
                  {user.role === 'admin' ? '👑 Administrator' : '👤 Customer'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Account Actions */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Account Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </button>
            <button className="flex items-center justify-center px-6 py-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Change Password
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            These features are coming soon!
          </p>
        </div>
      </div>

      {/* Features Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <svg className="w-8 h-8 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Available Features
          </h2>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 transform hover:scale-105 transition-transform">
              <div className="flex-shrink-0 bg-green-500 rounded-full p-2 mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Browse Sweets</h3>
                <p className="text-gray-600 text-sm">Explore our delicious collection of sweets</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 transform hover:scale-105 transition-transform">
              <div className="flex-shrink-0 bg-green-500 rounded-full p-2 mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Quick Purchase</h3>
                <p className="text-gray-600 text-sm">One-click purchasing for your favorites</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 transform hover:scale-105 transition-transform">
              <div className="flex-shrink-0 bg-green-500 rounded-full p-2 mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Product Details</h3>
                <p className="text-gray-600 text-sm">View detailed information for each sweet</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 transform hover:scale-105 transition-transform">
              <div className="flex-shrink-0 bg-green-500 rounded-full p-2 mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Search & Filter</h3>
                <p className="text-gray-600 text-sm">Find exactly what you're craving</p>
              </div>
            </div>

            {user.role === 'admin' && (
              <>
                <div className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200 transform hover:scale-105 transition-transform">
                  <div className="flex-shrink-0 bg-purple-500 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Admin Panel</h3>
                    <p className="text-gray-600 text-sm">Manage inventory and products</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200 transform hover:scale-105 transition-transform">
                  <div className="flex-shrink-0 bg-purple-500 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Stock Management</h3>
                    <p className="text-gray-600 text-sm">Add and update product stock</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-md">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">🔒 Your Data is Secure</h3>
            <p className="text-blue-800">
              Your personal information is protected with industry-standard encryption. 
              We never share your data with third parties.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Profile;
