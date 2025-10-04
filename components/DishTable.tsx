'use client'
import { DishDto } from "@/model/DishDto";
import { get10Dishes } from "@/service/DishService";
import { useDishesStore } from "@/store/DishesStore";
import Image from "next/image";
import React from "react";

export default  function DishTable() {
  const {dishes,getTenDishes} = useDishesStore((state) => state);
  if (dishes.length === 0) {
     getTenDishes();
  }

  return (
    <>
    <p className="text-3xl font-bold  text-purple-800  text-center capitalize p-3 my-2">Top ten Dishes</p>
      <div className="container mx-auto w-full my-5 grid grid-cols-3 gap-2">
        {dishes.map((dish: DishDto, index: number) => (
          <div key={index} className="card bg-base-100 w-96 shadow-sm mb-3">
            <figure>
              <Image
                src={`/images/dishes/${dish.image}`}
                alt={dish.title}
                width={450}
                height={400}
                className="w-full h-52  object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{dish.title}</h2>
              <p>
                {dish.sologan}
              </p>
              <div className="card-actions justify-between items-center">
                <span className="text-2xl text-primary">${dish.price}</span>
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
