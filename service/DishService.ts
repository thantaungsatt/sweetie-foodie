import { DishInfoDto } from "@/model/DishInfoDto";
import { RestaurantDto } from "@/model/RestaurantDto";

const baseUrl = "http://localhost:8080/api/sweetie-foodie";

export const get10Dishes = async () => {
  try {
    const response = await fetch(`${baseUrl}/10-dishes`, {
      cache: "force-cache",
    });
    if (!response.ok) throw new Error("Failed to fetch dishes");
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

///api/sweetie-foodie/dishes/restaurant/1

export const findDishInfoByRestaurantId = async (
  id: number
): Promise<DishInfoDto[]> => {
  try {
    const response = await fetch(`${baseUrl}/dishes/restaurant/${id}`,{
      cache: "force-cache",
    });
    if (!response.ok) throw new Error("Failed to fetch dishes");
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export const findAllRestaurants = async (): Promise<RestaurantDto[]> => {
  try {
    const response = await fetch(`${baseUrl}/list-restaurant`,{
      cache: "force-cache",
    });
    if (!response.ok) throw new Error("Failed to fetch restaurants");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
