import { Checkbox } from "@/components/ui/checkbox"; // shadcn path
import { Label } from "@/components/ui/label";
import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { listCollectionsWithCount } from "@/api/collections";
import { handleError } from "@/api/errorHandler";
import type { CollectionWithCountT } from "@/types/collection";

interface AssignProductToCollectionsPropsT {
		chosen: number[];
		setChosen: Dispatch<SetStateAction<number[]>>;
}

const AssignProductToCollections = ({chosen, setChosen}: AssignProductToCollectionsPropsT) => {
  const [collections, setCollections] = useState<CollectionWithCountT[]>([]);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const res = await listCollectionsWithCount();
        setCollections(res);
      } catch (err) {
        if (err instanceof Error) handleError(err.message);
        else handleError("An error occurred. Try again later.");
      }
    };
    loadCollections();
  }, []);

  const toggleCollection = (id: number, checked: boolean) => {
    setChosen((prev) =>
      checked ? [...prev, id] : prev.filter((cId) => cId !== id),
    );
  };

  return (
    <div className="space-y-3">
      <Label
        htmlFor="checkbox"
        className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
      >
        Choose collections
      </Label>

      {collections.map((collection) => {
        const isChecked = chosen.includes(collection.id);

        return (
          <div key={collection.id} className="flex items-center space-x-2">
            <Checkbox
              id="checkbox"
              checked={isChecked}
              onCheckedChange={(value) =>
                toggleCollection(collection.id, Boolean(value))
              }
            ></Checkbox>

            <p>{collection.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AssignProductToCollections;
