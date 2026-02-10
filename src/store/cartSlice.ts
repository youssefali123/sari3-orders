import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, MenuItem } from '@/types/menu';
import { RootState } from './store';

interface CartState {
    items: CartItem[];
}

const loadCartFromStorage = (): CartItem[] => {
    try {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        return [];
    }
};

const initialState: CartState = {
    items: loadCartFromStorage(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ item: MenuItem; category: string; restaurantName?: string }>) => {
            const { item, category, restaurantName } = action.payload;
            const existingItem = state.items.find(
                (cartItem) =>
                    cartItem.name === item.name &&
                    cartItem.category === category &&
                    cartItem.restaurantName === restaurantName
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, price: item.price as number, category, restaurantName, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        removeFromCart: (state, action: PayloadAction<{ name: string; category: string; restaurantName?: string }>) => {
            state.items = state.items.filter(
                (item) => !(
                    item.name === action.payload.name &&
                    item.category === action.payload.category &&
                    item.restaurantName === action.payload.restaurantName
                )
            );
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        updateQuantity: (state, action: PayloadAction<{ name: string; category: string; quantity: number; restaurantName?: string }>) => {
            const { name, category, quantity, restaurantName } = action.payload;
            if (quantity <= 0) {
                state.items = state.items.filter(
                    (item) => !(
                        item.name === name &&
                        item.category === category &&
                        item.restaurantName === restaurantName
                    )
                );
            } else {
                const existingItem = state.items.find(
                    (cartItem) =>
                        cartItem.name === name &&
                        cartItem.category === category &&
                        cartItem.restaurantName === restaurantName
                );
                if (existingItem) {
                    existingItem.quantity = quantity;
                }
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        changePrice: (state, action: PayloadAction<{ name: string; category: string; price: number; restaurantName?: string }>) => {
            const { name, category, price, restaurantName } = action.payload;
            const existingItem = state.items.find(
                (cartItem) =>
                    cartItem.name === name &&
                    cartItem.category === category &&
                    cartItem.restaurantName === restaurantName
            );
            if (existingItem) {
                existingItem.price = price;
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.items;
export const selectTotalItems = (state: RootState) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectTotalPrice = (state: RootState) => state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
