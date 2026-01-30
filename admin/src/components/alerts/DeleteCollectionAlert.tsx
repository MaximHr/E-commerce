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
import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { toast, ToastContainer } from "react-toastify";
import { handleError } from "@/api/errorHandler";
import { deleteCollection } from "@/api/collections";
import type { CollectionWithCountT } from "@/types/collection";

interface DeleteCollectionAlertPropsT {
  id: number;
  setCollections: Dispatch<SetStateAction<CollectionWithCountT[]>>;
}

const DeleteCollectionAlert = ({
  id,
  setCollections,
}: DeleteCollectionAlertPropsT) => {
  const [open, setOpen] = useState<boolean>(false);

  const deleteHandler = async () => {
    try {
      await deleteCollection(id);
      toast.success("Collection deleted succesfully.");
      setCollections((prev) =>
        prev.filter((collection) => collection.id != id),
      );
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
            onClick={deleteHandler}
          >
            Delete collection
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCollectionAlert;
