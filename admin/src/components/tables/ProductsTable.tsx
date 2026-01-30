import type { ProductTListResponse } from "@/types/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { DeleteProductAlert } from "../alerts/DeleteProductAlert";

interface ProductsTableProps {
  products: ProductTListResponse[];
  page: number;
  fetchProducts: (pageNumber: number) => Promise<void>;
}

const ProductsTable = ({
  products,
  page,
  fetchProducts,
}: ProductsTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-26">Image</TableHead>
            <TableHead className="w-40">Title</TableHead>
            <TableHead className="w-26">Price</TableHead>
            <TableHead className="w-26">Quantity</TableHead>
            <TableHead className="w-26">Discount</TableHead>
            <TableHead className="w-26">Update</TableHead>
            <TableHead className="w-26">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.slug} className="cursor-pointer">
              <TableCell
                onClick={() => navigate(`/admin/products/${product.slug}`)}
              >
                {product.image? (
                  <img
                    src={
                      import.meta.env.VITE_R2_URL +
                      "/image/" +
                      product.image
                    }
                    alt={product.title}
                    className="w-12 h-12 object-contain rounded"
                  />
                ) : (
                  <div className="overflow-hidden w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                    No Image
                  </div>
                )}
              </TableCell>
              <TableCell
                onClick={() => navigate(`/admin/products/${product.slug}`)}
                className="max-w-[220px] whitespace-normal wrap-break-word"
              >
                {product.title}
              </TableCell>
              <TableCell
                onClick={() => navigate(`/admin/products/${product.slug}`)}
              >
                €{product.price.toFixed(2)}
              </TableCell>
              <TableCell
                onClick={() => navigate(`/admin/products/${product.slug}`)}
                className={product.quantity == 0 ? "text-red-600" : ""}
              >
                {product.quantity}
              </TableCell>
              <TableCell
                onClick={() => navigate(`/admin/products/${product.slug}`)}
              >
                {product.discount > 0 ? <>{product.discount}%</> : "-"}
              </TableCell>
              <TableCell
                onClick={() => navigate(`/admin/products/${product.slug}`)}
              >
                <Button size="sm">Update</Button>
              </TableCell>
              <TableCell>
                <DeleteProductAlert
                  id={product.id}
                  page={page}
                  fetchProducts={fetchProducts}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
