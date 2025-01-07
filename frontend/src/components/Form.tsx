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
import { useProductStore } from "@/store/product";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const FormSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Price must be a number.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  imageUrl: z.string().url({
    message: "Image must be a valid URL.",
  }),
});

export function InputForm() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false)
  const { createNewProduct } = useProductStore();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      imageUrl: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const response = await createNewProduct({
      ...data,
      price: Number(data.price),
    });
    if (response.success) {
      setLoading(false);
      form.reset();
      toast({ title: "Success", description: response.message });
      nav(0);
    } else {
      toast({ title: "Error", description: response.message });
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Add product"}
        </Button>
      </form>
    </Form>
  );
}

