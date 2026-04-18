// export interface MenuItem {
//   name: string;
//   price: number;
//   description?: string;

// }

// export interface CartItem extends MenuItem {
//   quantity: number;
//   category: string;
//   restaurantName?: string;
// }

// export interface MenuData {
//   [category: string]: MenuItem[];
// }

// export interface OrderForm {
//   name: string;
//   phone: string;
//   address: string;
// }

export interface MenuItem {
  name: string;
  price: number | { [key: string]: number };
  description?: string;
  image?: string;
}

/** القسم الواحد */
export interface MenuCategory {
  image: string;
  items: MenuItem[];
}

/** كل المنيو */
export interface MenuData {
  [category: string]: MenuCategory;
}

export interface CartItem extends Omit<MenuItem, 'price'> {
  price: number;
  quantity: number;
  category: string;
  restaurantName?: string;
}

export interface OrderForm {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}

