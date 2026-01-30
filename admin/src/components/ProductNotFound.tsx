import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router";

const ProductNotFound = () => {
  const naviate = useNavigate();

  return (
    <div className="flex flex-col items-start h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">
        Product Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        Sorry, the product you are looking for does not exist or has been
        removed.
      </p>
      <Button
        onClick={() => naviate(-1)}
        variant="default"
        className="flex items-center gap-2"
      >
        Go back <Undo2 />
      </Button>
    </div>
  );
};

export default ProductNotFound;
