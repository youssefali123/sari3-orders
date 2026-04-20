import { Restaurant } from "@/types/restaurant";

const API_BASE = "https://6972d2a732c6bacb12c7c45a.mockapi.io/menu";
const API_BASE2 = "https://69e6740dce4e908a155f88d2.mockapi.io/menu";
// Fetch all restaurants/menus
export const getMenus = async (): Promise<Restaurant[]> => {
    try {
        const response = await fetch(API_BASE);
        const response2 = await fetch(API_BASE2);
        if (!response.ok) throw new Error("Failed to fetch menus");
        const data = await response.json();
        const data2 = await response2.json();
        return [...data, ...data2];
    } catch (error) {
        console.error("Error fetching menus:", error);
        throw error;
    }
};

// Get single restaurant by ID
export const getRestaurantById = async (id: string): Promise<Restaurant> => {
    try {
        const response = await fetch(`${API_BASE}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch restaurant");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        throw error;
    }
};

// Create new restaurant
export const createRestaurant = async (restaurant: Omit<Restaurant, 'id'>): Promise<Restaurant> => {
    try {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(restaurant),
        });
        if (!response.ok) throw new Error("Failed to create restaurant");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating restaurant:", error);
        throw error;
    }
};

// Update restaurant
export const updateRestaurant = async (id: string, restaurant: Partial<Restaurant>): Promise<Restaurant> => {
    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(restaurant),
        });
        if (!response.ok) throw new Error("Failed to update restaurant");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating restaurant:", error);
        throw error;
    }
};

// Delete restaurant
export const deleteRestaurant = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete restaurant");
    } catch (error) {
        console.error("Error deleting restaurant:", error);
        throw error;
    }
};
