"use client";
import { DishInfoDto } from "@/model/DishInfoDto";
import { RestaurantDto } from "@/model/RestaurantDto";
import {
  findAllRestaurants,
  findDishInfoByRestaurantId,
} from "@/service/DishService";
import { useCartItemStore } from "@/store/CartItemStore";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

export default function DishesByRestaurentPage() {
  const { cartItems, addToCart, removeFromCart } = useCartItemStore();

  //console.log(cartItems);

  const [restaurant, setRestaurant] = useState<RestaurantDto>();

  const [dishesInfo, setDishesInfo] = useState<DishInfoDto[]>([]);

  const params = useParams();
  useEffect(() => {
    const id = Number(params.id);
    if (!id || isNaN(id)) return;

    findDishInfoByRestaurantId(id)
      .then((res) => {
        const enriched = res.map((d) => ({ ...d, quantity: 1 }));
        setDishesInfo(enriched);
      })
      .catch(console.log);

    findAllRestaurants()
      .then((res) => {
        const matched = res.find((r) => r.id === id);
        setRestaurant(matched);
      })
      .catch(console.log);
  }, [params.id]);

  const increaseQuantity = (title: string) => {
    const updatedDishesInfo = dishesInfo.map((dish) => {
      if (dish.title === title) {
        return { ...dish, quantity: (dish.quantity || 0) + 1 };
      }
      return dish;
    });
    setDishesInfo(updatedDishesInfo);
  };

  const decreaseQuantity = (title: string) => {
    const updatedDishesInfo = dishesInfo.map((dish) => {
      if (dish.title === title && dish.quantity! > 1) {
        return { ...dish, quantity: (dish.quantity || 1) - 1 };
      }
      return dish;
    });
    setDishesInfo(updatedDishesInfo);
  };

  const handleQuantityChange = (title: string, quantity: number) => {
    const updatedDishesInfo = dishesInfo.map((dish) => {
      if (dish.title === title) {
        return { ...dish, quantity };
      }
      return dish;
    });
    setDishesInfo(updatedDishesInfo);
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section
          className="relative bg-gray-900 h-96 overflow-hidden"
          style={{ backgroundImage: `url(/images/restrrr.png)` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="flex flex-col md:flex-row items-center w-full">
              {/* Restaurant Image with Border */}
              <div className="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0">
                <div className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition duration-300 border-4 border-white border-opacity-80 p-1 mt-4">
                  <Image
                    src={`/images/${restaurant?.imageUrl}.jpg`}
                    alt="Restaurent Image"
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Restaurant Info with Purple Gradient Name */}
              <div className="w-full md:w-2/3 lg:w-3/4 md:pl-12 text-white">
                <h1 className="text-4xl font-bold mb-2 ">
                  <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                    {restaurant?.name}
                  </span>
                </h1>
                <div className="flex items-center mb-4">
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-lg">4.5 (120 reviews)</span>
                </div>
                <p className="text-lg mb-4">{restaurant?.address}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Italian
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Pasta
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Fine Dining
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Menu Items Section (Left - Narrower) */}
            <div className="lg:w-3/5">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                MENU
              </h2>

              <div className="space-y-4">
                {dishesInfo.map((dish, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                  >
                    <div className="flex">
                      {/* Dish Image */}
                      <div className="w-1/3 p-3">
                        <div className="relative h-full rounded-xl overflow-hidden border-2 border-white shadow-md">
                          <Image
                            src={`/images/dishes/${dish.image}`}
                            alt={dish.title}
                            width={200}
                            height={150}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Dish Info */}
                      <div className="w-2/3 p-4">
                        <div className="flex flex-col h-full justify-between">
                          {/* Title and Slogan */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                              {dish.title}
                            </h3>
                            <p
                              className="text-sm text-gray-600 line-clamp-2 mb-3"
                              style={{ textAlign: "justify" }}
                            >
                              {dish.slogan}
                            </p>
                          </div>

                          {/* Price, Quantity, and Add to Cart */}
                          <div className="flex items-end justify-between">
                            <span className="text-lg font-bold text-gray-800">
                              ${dish.price.toFixed(2)}
                            </span>

                            <div className="flex items-center">
                              <button
                                onClick={() => decreaseQuantity(dish.title)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-l cursor-pointer"
                              >
                                -
                              </button>
                              <input
                                title="quantity"
                                type="number"
                                value={dish.quantity || 1}
                                min="1"
                                onChange={(e) =>
                                  handleQuantityChange(
                                    dish.title,
                                    Number(e.target.value)
                                  )
                                }
                                className="w-12 text-center border-t border-b border-gray-300 py-1"
                              />
                              <button
                                onClick={() => increaseQuantity(dish.title)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-r cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Add to Cart button */}
                          <div className="mt-4">
                            <button
                              onClick={() => addToCart(dish)}
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Section (Right) */}
            <div className="lg:w-2/5">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-4 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Your Cart
                  </h2>
                  <div className="p-5 mt-3">
                    {cartItems &&
                      cartItems.length > 0 &&
                      cartItems.map((item, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between items-center">
                            <p>{item.title}</p>
                            <FaTrashCan
                              onClick={() => removeFromCart(item)} className="cursor-pointer"
                              size={20}
                            />
                          </div>
                          <div className="flex justify-between items-center">
                              <p>${item.price.toFixed(2)}</p>
                              <p className="p-2">{item.quantity}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="p-5 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-3xl">Total</p>
                      <p className="font-bold">
                        ${cartItems.reduce((total, item) => total + (item.price * item.quantity!), 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 border-t border-gray-200">
                    <Link href="/checkout"
                      className="w-full bg-purple-600
                       hover:bg-purple-700 text-white 
                       font-bold py-2 px-4 rounded transition-colors 
                       duration-200"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
