import { handleError } from "@/api/errorHandler";
import { listProducts } from "@/api/products";
import ProductsTable from "@/components/tables/ProductsTable";
import { Button } from "@/components/ui/button";
import type { ProductTListResponse } from "@/types/product";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ToastContainer } from "react-toastify";

const PAGE_SIZE = 5;

const Products = () => {
  const [products, setProducts] = useState<ProductTListResponse[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  const fetchProducts = async (pageNumber: number) => {
    try {
      const res = await listProducts(pageNumber, PAGE_SIZE);
      setTotalElements(res.totalElements);
      setTotalPages(res.totalPages);
      setProducts(res.content);
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("An error occurred. Try again later.");
      }
    }
  };

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <>
      <div className="flex items-center gap-3 justify-between mb-7">
        <h1 className="text-2xl special-font">
          Products {`(${totalElements})`}
        </h1>
        <Link to="/admin/add-product">
          <Button>Add new product</Button>
        </Link>
      </div>
      <ToastContainer />
      <ProductsTable
        products={products}
        page={page}
        fetchProducts={fetchProducts}
      />
      <div className="flex justify-end items-center gap-3 mt-4">
        <span className="text-sm">
          Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={page === 0}
        >
          <MoveLeft />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={page >= totalPages - 1}
        >
          <MoveRight />
        </Button>
      </div>
    </>
  );
};

export default Products;
