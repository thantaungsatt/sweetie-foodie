import { RestaurantDto } from "@/model/RestaurantDto";
import { findAllRestaurants } from "@/service/DishService";
import { create } from "zustand";

interface RestaurantStore {
  restaurents: RestaurantDto[];
  restaurant: RestaurantDto | null;
  getRestaurantById: (id: number) => Promise<void>;
}

export const useRestaurantStore = create<RestaurantStore>((set, get) => {
  // Immediately fetch and set restaurents
  (async () => {
    const response = await findAllRestaurants();
    set({ restaurents: response });
  })();

  return {
    restaurents: [],
    restaurant: null,

    getRestaurantById: async (id: number) => {
      const state = get(); // Zustand's get()
      const list = state.restaurents.length
        ? state.restaurents
        : await findAllRestaurants();
      const resta = list.find((r) => r.id === id);
      set({ restaurant: resta });
    },
  };
});
