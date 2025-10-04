


import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import "../app/app.css"

export default function Navbar() {
    const loggedIn =true;
  return (

       <nav className="sticky top-0 z-50 bg-gray-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={70}
                  height={70}
                  priority
              />
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  SweetieFoodie
                </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link
                    href="/"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300"
                >
                  Home
                </Link>
                <Link
                    href="/restaurant"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300"
                >
                  Restaurants
                </Link>
                <Link
                    href="/menu"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300"
                >
                  Menu
                </Link>

                {!loggedIn ? (
                    <>
                      <Link
                          href="/login"
                          className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300"
                      >
                        Login
                      </Link>
                      <Link
                          href="/register"
                          className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition duration-300"
                      >
                        Register
                      </Link>
                    </>
                ) : (
                    <button
                    
                        className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition duration-300"
                    >
                      Logout
                    </button>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition duration-300">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    
  )
}
