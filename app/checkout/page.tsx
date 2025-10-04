'use client';
import { useCartItemStore } from "@/store/CartItemStore";
import Link from "next/link";
import React from "react";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCartItemStore();

  const total = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Your Order Summary 📝
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
            <Link href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200">
              Start Ordering
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dish</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2} className="px-6 py-4 text-right text-lg font-bold text-gray-900">Total:</td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900">${total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                style={{ textDecoration: "none" }}
                href="/"
                className="w-full sm:w-auto inline-flex justify-center items-center px-36 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 transform hover:scale-105"
                onClick={() => clearCart()}
              >
                Confirm Order
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}