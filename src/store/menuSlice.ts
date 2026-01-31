import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMenus } from "@/services/menus";

import { Restaurant, RestaurantCategory } from "@/types/restaurant";

interface MenuState {
    menu: Restaurant[];
    // categories: string[];
    categories: (RestaurantCategory | "الكل")[];
    loading: boolean;
    error: string | null;
}

const initialState: MenuState = {
    menu: [],
    categories: [],
    loading: false,
    error: null,
}

export const fetchMenus = createAsyncThunk(
    "menu/fetchMenus",
    async () => {
        const response = await getMenus();
        return response;
    }
)

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMenus.fulfilled, (state, action) => {
            const menuItems = action.payload as Restaurant[];
            state.menu = menuItems;
            state.loading= false;
            state.categories = [...new Set(menuItems.map((e) => e.category))];
        })
        builder.addCase(fetchMenus.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(fetchMenus.pending, (state) => {
            state.loading = true;
        })
    }
})

// export const {  } = menuSlice.actions
export default menuSlice.reducer