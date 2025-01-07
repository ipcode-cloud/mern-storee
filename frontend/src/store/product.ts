import { create } from "zustand";

export type Product = {
  _id?: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type ProductStore = {
  products: Product[];
  setProduct: (product: Product) => void;
  createNewProduct: (
    product: Product
  ) => Promise<{ success: boolean; message: string }>;
  fetchProducts: () => Promise<void>;
  deleteProduct: (id: string) => Promise<{ success: boolean; message: string }>;
  updateProduct: (
    id: string,
    data: Partial<Product>
  ) => Promise<{ success: boolean; message: string }>;
  getProductById: (id: string) => Promise<Product | undefined>;
};

interface CreateNewProductResponse {
  success: boolean;
  message: string;
}

interface FetchProductsResponse {
  data: Product[];
}

interface DeleteProductResponse {
  success: boolean;
  message: string;
}
interface UpdateProductResponse {
  success: boolean;
  message: string;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProduct: (product: Product) =>
    set((state) => ({ products: [...state.products, product] })),
  createNewProduct: async (
    product: Product
  ): Promise<CreateNewProductResponse> => {
    if (!product.name || !product.price || !product.description) {
      return { success: false, message: "Please fill all fields" };
    }
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        return {
          success: false,
          message: `HTTP error! status: ${response.status}`,
        };
      }
      const data: Product = await response.json();
      set((state) => ({ products: [...state.products, data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },
  fetchProducts: async (): Promise<void> => {
    try {
      const response = await fetch("/api/products");
      console.log("response: ", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: FetchProductsResponse = await response.json();
      set(() => ({ products: data.data }));
    } catch (error) {
      console.error(error);
    }
  },
  deleteProduct: async (id): Promise<DeleteProductResponse> => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },
  updateProduct: async (
    id: string,
    data: Partial<Product>
  ): Promise<UpdateProductResponse> => {
    if (!data.name || !data.price || !data.description || !data.imageUrl) {
      return { success: false, message: "Please fill all fields" };
    }
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedProduct: Product = await response.json();
      if (!updatedProduct)
        return { success: false, message: "Product not updated" };
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? { ...product, ...data } : product
        ),
      }));
      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  },
  getProductById: async (id: string): Promise<Product | undefined> => {
    const state = useProductStore.getState();
    const product = state.products.find((product) => product._id === id);
    console.log(product);
    return product;
  },
}));
