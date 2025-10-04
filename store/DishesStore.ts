import { create } from "zustand";
import  { DishDto } from "../model/DishDto";
import { get10Dishes } from "@/service/DishService";


export  const  useDishesStore=create<{dishes:DishDto[],
    getTenDishes:()=>void}>((set)=>{
    return {
        dishes:[] as DishDto[],
         getTenDishes: async () => {
            const response = await get10Dishes();
            set({ dishes: response });
          },
    }
})