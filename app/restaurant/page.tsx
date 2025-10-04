
import { findAllRestaurants } from "@/service/DishService";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsPhone } from "react-icons/bs";

export default async function RestaurantPage() {
  const restaurents = await findAllRestaurants();
  return (
    <>
      <div className="container mx-auto w-full grid grid-cols-2 gap-2 mt-3 p-2">
        {restaurents &&
          restaurents.length > 0 &&
          restaurents.map((restaurant) => (
            <div
              key={restaurant.id}
              className="card bg-base-100 w-96 shadow-sm"
            >
              <figure>
                <Image
                  src={`/images/${restaurant.imageUrl}.jpg`}
                  alt={restaurant.name}
                  width={450}
                  height={400}
                  className="w-full h-52  object-cover"
                />
              </figure>
              <div className="card-body">
                <p className="text-primary text-2xl text-center font-bold capitalize">{restaurant.name}</p>
                <p>
                  {restaurant.address}
                </p>
                <div className="flex justify-between items-center">
                    <p>{restaurant.openTime}AM</p>
                    <p>{restaurant.closeTime}PM</p>
                </div>
                <div className="card-actions justify-between items-center">
                    <p className="flex items-center"><BsPhone size={25} /> {restaurant.phone}</p>
                  <Link href={`/restaurant/${restaurant.id}`} 
                    className="btn btn-primary">Learn More</Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
