import { create } from "zustand";
// import { createProducts } from "../../../backend/controllers/products.controllers";

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProducts: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();

    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created!" };
  },

  getProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  deleteProducts: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success)
      return {
        success: false,
        message: data.message,
      };

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    })); //use to update UI immediately to remove deleted product card without needing refresh

    return { success: true, message: data.message };
  },
}));
