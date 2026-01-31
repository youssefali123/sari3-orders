import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "@/types/menu";
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateQuantity as updateQuantityAction,
  clearCart as clearCartAction,
  selectCart,
  selectTotalItems,
  selectTotalPrice
} from "../store/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);

  const addToCart = useCallback((item: MenuItem, category: string, restaurantName?: string) => {
    dispatch(addToCartAction({ item, category, restaurantName }));
  }, [dispatch]);

  const removeFromCart = useCallback((itemName: string, category: string, restaurantName?: string) => {
    dispatch(removeFromCartAction({ name: itemName, category, restaurantName }));
  }, [dispatch]);

  const updateQuantity = useCallback(
    (itemName: string, category: string, quantity: number, restaurantName?: string) => {
      dispatch(updateQuantityAction({ name: itemName, category, quantity, restaurantName }));
    },
    [dispatch]
  );

  const clearCart = useCallback(() => {
    dispatch(clearCartAction());
  }, [dispatch]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
};
