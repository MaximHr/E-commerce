import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { handleError } from "@/api/errorHandler";
import { deleteProduct } from "@/api/products";
import { toast } from "react-toastify";

interface ProductDeleteAlertProps {
  id: number;
  page: number;
  fetchProducts: (pageNumber: number) => Promise<void>;
}

export function DeleteProductAlert({
  id,
  page,
  fetchProducts,
}: ProductDeleteAlertProps) {
  const [open, setOpen] = useState(false);

  const handaleProductDelete = async () => {
    try {
			const data = await deleteProduct(id);
			await fetchProducts(page);
			toast.success(data);
      setOpen(false);
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("An error occurred. Try again later.");
      }
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handaleProductDelete}
          >
            Delete product
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
