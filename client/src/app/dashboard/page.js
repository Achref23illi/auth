'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log('Dashboard mounted, auth state:', { user, loading });

    // Don't redirect while loading
    if (!loading && !user) {
      console.log('No user found in dashboard, redirecting to login');
      router.push('/login');
    }
  }, [user, loading, router]);

  if (!isClient || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-50 to-blue-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
        <p className="text-gray-600 text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    // Close menu if it's open on mobile
    setMenuOpen(false);
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-50 to-blue-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-indigo-600">Auth System</h1>
              </div>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-6">
                <div className="text-sm font-medium text-gray-700 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                    <span className="text-indigo-600 font-bold">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <span>Welcome, {user.name}</span>
                </div>
                <Link 
                  href="/profile" 
                  className="px-4 py-2 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition duration-150"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                >
                  Sign out
                </button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                {!menuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        {menuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
              <div className="px-4 py-2 text-sm text-gray-700 font-medium border-l-4 border-transparent">
                Welcome, {user.name}
              </div>
              <Link 
                href="/profile" 
                className="block px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 border-l-4 border-transparent hover:border-indigo-500 transition duration-150"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-l-4 border-transparent hover:border-red-500 transition duration-150"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        
        <main className="mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Welcome Card */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg mb-8">
              <div className="p-6 bg-indigo-600 text-white">
                <h2 className="text-2xl font-bold">Welcome to your dashboard, {user.name}!</h2>
                <p className="mt-2 text-indigo-100">We&apos;re glad to have you here. This is your secure personal space.</p>
              </div>
            </div>
            
            {/* Account Information Card */}
            <div className="bg-white shadow-lg overflow-hidden rounded-lg">
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                <h3 className="text-xl font-semibold text-gray-900">
                  Account Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your personal details and profile information.
                </p>
              </div>
              
              <div className="divide-y divide-gray-200">
                <div className="px-6 py-5 flex flex-wrap md:flex-nowrap">
                  <div className="w-full md:w-1/3 font-medium text-gray-500 mb-2 md:mb-0">Full name</div>
                  <div className="w-full md:w-2/3 text-gray-900">{user.name}</div>
                </div>
                
                <div className="px-6 py-5 flex flex-wrap md:flex-nowrap">
                  <div className="w-full md:w-1/3 font-medium text-gray-500 mb-2 md:mb-0">Email address</div>
                  <div className="w-full md:w-2/3 text-gray-900">{user.email}</div>
                </div>
                
                {user.bio && (
                  <div className="px-6 py-5 flex flex-wrap md:flex-nowrap">
                    <div className="w-full md:w-1/3 font-medium text-gray-500 mb-2 md:mb-0">Bio</div>
                    <div className="w-full md:w-2/3 text-gray-900">{user.bio}</div>
                  </div>
                )}
                
                <div className="px-6 py-5 flex flex-wrap md:flex-nowrap">
                  <div className="w-full md:w-1/3 font-medium text-gray-500 mb-2 md:mb-0">Account created</div>
                  <div className="w-full md:w-2/3 text-gray-900">
                    {/* Format date if available, otherwise show placeholder */}
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                  </div>
                </div>
              </div>
              
              {/* Action button */}
              <div className="px-6 py-4 bg-gray-50 flex justify-end">
                <Link 
                  href="/profile" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}