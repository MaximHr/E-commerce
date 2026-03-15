import { useCallback, useEffect, useState } from "react";
import Isle from "../Components/Isle";
import { toast } from "react-toastify";
import { fetchProducts } from "../utils/getData";

const PAGE_SIZE = 50;

const Products = () => {
  const [products, setProducts] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [totalElements, setTotalElements] = useState(0);

  const loadProducts = useCallback(
    async (pageNumber, size) => {
      try {
        const pageableProducts = await fetchProducts(
          pageNumber,
          size,
          sortBy,
          order,
        );
        setProducts(pageableProducts.content);
        setTotalElements(pageableProducts.totalElements);
      } catch (err) {
        toast.error(err.message);
      }
    },
    [sortBy, order],
  );

  useEffect(() => {
    loadProducts(0, PAGE_SIZE);
  }, [loadProducts]);

  return (
    <div className="products-page">
      <Isle
        advancedOptions={true}
        title="Our plushies"
        items={products}
        setSortBy={setSortBy}
        setOrder={setOrder}
        totalElements={totalElements}
      />
    </div>
  );
};

export default Products;
