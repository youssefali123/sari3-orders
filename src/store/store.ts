import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice"
import cartSlice from "./cartSlice" // Import the new slice

export const store = configureStore({
    reducer: {
        menu: menuSlice,
        cart: cartSlice // Add it to the reducer object
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch