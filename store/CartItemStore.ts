import { DishInfoDto } from "@/model/DishInfoDto";
import { create } from "zustand";

interface CartItemStore {
  cartItems: DishInfoDto[];
  addToCart: (dish: DishInfoDto) => void;
  removeFromCart: (dish: DishInfoDto) => void;
  clearCart: () => void;
}
export const useCartItemStore = create<CartItemStore>((set) => {
  return {
    cartItems: [] as DishInfoDto[],
    addToCart: (dish: DishInfoDto) =>
      set((state) => {
        const exists = state.cartItems.some(
          (item) => item.title === dish.title
        );
        if (exists) return state; 
        return { cartItems: [...state.cartItems, dish] };
      }),
    removeFromCart: (dish: DishInfoDto) =>
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.title !== dish.title),
      })),
    clearCart: () => set({ cartItems: [] }),  
  };
});
