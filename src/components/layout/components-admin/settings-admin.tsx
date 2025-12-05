'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { User, LogOut } from 'lucide-react';

export default function AdminSettings() {
  const { data: session, status } = useSession();
  const [activeSection, setActiveSection] = useState('profile');

  // Loading state
  if (status === 'loading') {
    return (
      <div className="flex-1 overflow-x-auto p-7">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (status === 'unauthenticated') {
    return (
      <div className="flex-1 overflow-x-auto p-7">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-600">Anda harus login terlebih dahulu</p>
        </div>
      </div>
    );
  }

  // Get user data from session
  const user = session?.user;
  const userName = user?.name || 'User';
  const userEmail = user?.email || '';
  const userImage = user?.image;
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login-admin' }); // Redirect ke halaman login setelah logout
  };

  return (
    <div className="flex-1 overflow-x-auto p-7">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Pengaturan</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveSection('profile')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
              activeSection === 'profile'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-gray-800'
            }`}
          >
            <User className="w-5 h-5" />
            Profil
          </button>
          <button
            onClick={() => setActiveSection('logout')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
              activeSection === 'logout'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-gray-800'
            }`}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Profil Pengguna</h2>
              
              {/* Avatar */}
              <div className="flex items-center gap-6 mb-8">
                {userImage ? (
                  <img 
                    src={userImage} 
                    alt={userName}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {userInitials}
                  </div>
                )}
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
                  Ubah Foto
                </button>
              </div>

              {/* Form */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    defaultValue={userName}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={userEmail}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Anggota</label>
                  <input
                    type="text"
                    defaultValue={user?.id || 'LIB-2024-001'}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-500 bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                  <input
                    type="tel"
                    defaultValue={user?.phone || '+62 812-3456-7890'}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {activeSection === 'logout' && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <LogOut className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Keluar dari Akun</h2>
              <p className="text-gray-600 mb-8">Apakah Anda yakin ingin keluar dari akun perpustakaan?</p>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setActiveSection('profile')}
                  className="px-8 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium"
                >
                  Batal
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-8 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                >
                  Ya, Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}