import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "react-toastify";
import ImageUploadButton from "../ImageUploadButton";
import { Trash, Edit } from "lucide-react";
import type { CollectionWithCountT } from "@/types/collection";
import { deleteImage } from "@/api/images";
import { handleError } from "@/api/errorHandler";
import { createCollection } from "@/api/collections";

interface CollectionDialogProps {
  setCollections: React.Dispatch<React.SetStateAction<CollectionWithCountT[]>>;
  collection: CollectionWithCountT | undefined;
}

export default function CollectionDialog({
  setCollections,
  collection,
}: CollectionDialogProps) {
  const [name, setName] = useState<string>(collection?.title || "");
  const [imageUrl, setImagesUrl] = useState<string>(
    collection ? collection.imageUrl : "",
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const removeImage = async () => {
    try {
      await deleteImage(imageUrl);
      setImagesUrl("");
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("An error occurred. Try again later.");
      }
    }
  };

  const submitHandler = async() => {
    try {
      if (name.trim() == "") {
        throw new Error("Name field is required.");
      } else if (imageUrl.trim() == "") {
        throw new Error("Please upload an image.");
      }
      if (collection) {
        const updatedCategory = {
          ...collection,
          name,
          imageUrl,
        };
        //TODO: update collection
      } else {
        const res = await createCollection(name, imageUrl);
				setName("");
				setImagesUrl("");
				setCollections(prev => [res, ...prev]);
      }
      setIsOpen(false);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          {collection ? (
            <Button variant="outline" className="shadow-none" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          ) : (
            <Button>Add collection</Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mb-2">
            <DialogTitle>{!collection ? "Add" : "Edit"} Collection</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="e.g. men's wear"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Image</Label>
              {imageUrl == "" ? (
                <ImageUploadButton
                  images={imageUrl}
                  setImagesUrl={setImagesUrl}
                  multiple={false}
                />
              ) : (
                <div className="h-24 overflow-hidden flex items-start">
                  <img
                    style={{ height: "100%" }}
                    src={import.meta.env.VITE_R2_URL + "/image/" + imageUrl}
                    alt="collection image"
                  />
                  <div
                    className="rounded cursor-pointer p-1 hover:text-destructive relative -translate-x-6.5 translate-y-1 bg-white/75 transition-colors duration-75"
                    onClick={removeImage}
                  >
                    <Trash size={14} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={submitHandler}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
