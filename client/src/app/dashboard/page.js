'use client';

import React, { useState, useEffect } from 'react'; // Add useState here
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // In src/app/dashboard/page.js
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">Auth System</h1>
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-700">
                    Welcome, {user.name}
                  </div>
                  <Link 
                    href="/profile" 
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Account Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Your personal details and application.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.email}
                    </dd>
                  </div>
                  {user.bio && (
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Bio</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.bio}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}