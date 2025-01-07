import { Edit, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Product, useProductStore } from "@/store/product";
import { toast } from "@/hooks/use-toast";
import Model from "./Model";
import { EditForm } from "./EditForm";

const ProductCard = ({ product }: { product: Product }) => {
  const { deleteProduct } = useProductStore();
  const { _id, imageUrl, name, description, price } = product;
  return (
    <Card className="shadow-lg">
      <CardContent className="flex">
        <img
          src={imageUrl}
          alt={name}
          className="aspect-square object-cover flex-shrink-0 flex-1 w-full"
        />
      </CardContent>
      <CardFooter>
        <CardHeader className="flex flex-col w-full">
          <CardTitle className="text-lg font-bold text-slate-800">
            {name}
          </CardTitle>

          <CardDescription>
            <div className="flex justify-between items-center gap-2">
              <p className="flex-1 text-lg">${price}</p>
              <Model
                title="Edit Product"
                btn={
                  <Button>
                    <Edit size={24} />
                  </Button>
                }
                component={<EditForm product={product} />}
              />
              <Button
                variant="outline"
                className="p-2"
                onClick={async () => {
                  if (_id) {
                    const response = await deleteProduct(_id);
                    if (response.success) {
                      toast({
                        title: "Success",
                        description: response.message,
                      });
                    } else {
                      toast({ title: "Error", description: response.message });
                    }
                  }
                }}
              >
                <Trash size={24} />
              </Button>
            </div>
          </CardDescription>
          <CardDescription>{description?.slice(0, 20)}</CardDescription>
          <Button>Buy Now</Button>
        </CardHeader>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
