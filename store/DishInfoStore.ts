import { DishInfoDto } from "@/model/DishInfoDto";
import { findDishInfoByRestaurantId } from "@/service/DishService";
import { create } from "zustand";



export const useDishInfoStore = create<{dishesInfo:DishInfoDto[],
    getDishInfo:(id:number)=> void}>((set) => ({
    dishesInfo:[] as DishInfoDto[],
    getDishInfo: async (id:number) =>{
        const response = await findDishInfoByRestaurantId(id);
        set({dishesInfo:response})
    }
}))