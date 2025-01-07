import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import { Product, useProductStore } from "@/store/product";
import { useEffect, useState } from "react";
import { FormSchema } from "./Form";
import { useNavigate } from "react-router-dom";

export function EditForm({ product }: { product: Product }) {
  const nav = useNavigate();
  const [currentProduct, setCurrentProduct] = useState(product);
  const { _id } = currentProduct;
  const { getProductById } = useProductStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (_id) {
        const fetchedProduct = await getProductById(_id);
        if (fetchedProduct) {
          setCurrentProduct({
            ...fetchedProduct,
          });
        } else {
          toast({ title: "Error", description: "Product not found." });
        }
      }
    };
    fetchProduct();
  }, [_id, getProductById, nav]);
  const { updateProduct } = useProductStore();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: currentProduct?.name || "",
      price: currentProduct?.price?.toString() || "",
      description: currentProduct?.description || "",
      imageUrl: currentProduct?.imageUrl || "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (currentProduct._id) {
      const response = await updateProduct(currentProduct._id, {
        ...data,
        price: Number(data.price),
      });
      if (response.success) {
        form.reset();
        toast({ title: "Success", description: response.message });
        nav(0);
      } else {
        toast({ title: "Error", description: response.message });
      }
    } else {
      toast({ title: "Error", description: "Product ID is missing." });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Modify
        </Button>
      </form>
    </Form>
  );
}
