import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CollectionWithCountT } from "@/types/collection";
import DeleteCollectionAlert from "../alerts/DeleteCollectionAlert";
import type { Dispatch, SetStateAction } from "react";
import CollectionDialog from "../dialogs/CollectionDialog";

interface CollectionTableProps {
  collections: CollectionWithCountT[];
  setCollections: Dispatch<SetStateAction<CollectionWithCountT[]>>;
}

const CollectionsTable = ({
  collections,
  setCollections,
}: CollectionTableProps) => {
  return (
    <div className="rounded-md border w-fit max-w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-5">Image</TableHead>
            <TableHead className="px-5">Title</TableHead>
            <TableHead className="px-5">Total products</TableHead>
            <TableHead className="px-5">Update</TableHead>
            <TableHead className="px-5">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collections.map((collection) => (
            <TableRow key={collection.slug}>
              <TableCell className="px-5">
                {collection.imageUrl ? (
                  <img
                    src={
                      import.meta.env.VITE_R2_URL +
                      "/image/" +
                      collection.imageUrl
                    }
                    alt={collection.title}
                    className="w-12 h-12 object-contain rounded"
                  />
                ) : (
                  <div className="overflow-hidden w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                    No Image
                  </div>
                )}
              </TableCell>
              <TableCell className="px-5 max-w-[220px] whitespace-normal wrap-break-word">
                {collection.title}
              </TableCell>
              <TableCell className="px-5">{collection.productsCount}</TableCell>
              <TableCell className="px-5">
                <CollectionDialog setCollections={setCollections} collection={collection}/>
              </TableCell>
              <TableCell className="px-5">
                <DeleteCollectionAlert
                  setCollections={setCollections}
                  id={collection.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CollectionsTable;
