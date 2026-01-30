import CollectionsTable from "@/components/tables/CollectionsTable";
import CollectionDialog from "@/components/dialogs/CollectionDialog";
import type { CollectionWithCountT } from "@/types/collection";
import { useEffect, useState } from "react";
import { handleError } from "@/api/errorHandler";
import { listCollectionsWithCount } from "@/api/collections";
import { ToastContainer } from "react-toastify";

const Products = () => {
  const [collections, setCollections] = useState<CollectionWithCountT[]>([]);

  const fetchCollections = async () => {
    try {
			const data = await listCollectionsWithCount();
			setCollections(data);
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("An error occurred. Try again later.");
      }
    }
  };

  useEffect(() => {
		fetchCollections();
	}, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 justify-between mb-7">
        <h1 className="text-2xl special-font">
          Collections {collections.length > 1 && `(${collections.length})`}
        </h1>
        <CollectionDialog
          collection={undefined}
          setCollections={setCollections}
        />
      </div>
			<ToastContainer />
      <CollectionsTable
        collections={collections}
        setCollections={setCollections}
      />
    </div>
  );
};

export default Products;
