import { useNavigate } from "react-router-dom";
import useAddToCart from "../utils/useAddToCart";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Product = ({ item }) => {
  const usenavigate = useNavigate();
  const addToCart = useAddToCart();

  const navigate = (e) => {
    if (!e.target.className.includes("add-to-cart")) {
      usenavigate(`/details/${item.slug}`);
    }
  };
  return (
    <div
      onClick={(e) => navigate(e)}
      className="product relative overflow-hidden"
    >
      {item?.discount > 0 && <div className="discount-ribbon">-{item.discount}%</div>}

      <div className="img-container">
        <img
          src={
            item.titleImage &&
            import.meta.env.VITE_R2_BUCKET_URL + "/image/" + item.titleImage
          }
          alt={item.id ? "toys" : ""}
        />
      </div>
      <div className="product-info">
        <p className="product-title">
          {item.title || <Skeleton width="210px" />}
        </p>
        <p className="product-price">
          {item.price && "€"} {item.price || <Skeleton width={"100px"} />}
        </p>
        {item && item.quantity === 0 ? (
          <a className="add-to-card out-of-stock">Out of stock.</a>
        ) : (
          <a className="add-to-cart" onClick={() => addToCart(item)}>
            Add to cart
          </a>
        )}
      </div>
    </div>
  );
};

export default Product;
