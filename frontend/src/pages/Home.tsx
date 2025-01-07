import { InputForm } from "@/components/Form";
import { Loading } from "@/components/Loading";
import Model from "@/components/Model";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/product";
import { useEffect } from "react";

const Home = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <div className="flex flex-col justify-center min-h-screen w-full">
      <h1 className="text-3xl font-bold text-left">Home</h1>
      <Model
        title="New Product"
        btn={<Button className="self-end mr-5">New Product</Button>}
        component={<InputForm />}
      />

      <div className="container mx-auto p-5 grid grid-cols-3 max-sm:grid-cols-1 gap-4">
        {products.length <= 0 ? (
          <>
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
