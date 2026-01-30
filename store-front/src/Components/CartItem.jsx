import { FaMinus, FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const CartItem = ({ item, products, setProducts }) => {
  const removeItem = () => {
    setProducts(products.filter((product) => product.id != item.id));
  };

  const reduce = () => {
    if (item.clientQuantity > 1) {
      setProducts(
        products.map((product) =>
          product.id == item.id
            ? { ...product, clientQuantity: product.clientQuantity - 1 }
            : { ...product },
        ),
      );
    }
  };

  const increment = () => {
    setProducts(
      products.map((product) =>
        product.id == item.id
          ? {
              ...product,
              clientQuantity:
                product.clientQuantity < product.quantity
                  ? product.clientQuantity + 1
                  : product.clientQuantity,
            }
          : { ...product },
      ),
    );
  };
  return (
    <div>
      {item?.id && (
        <div className="cart-item">
          <IoClose
            onClick={removeItem}
            className="remove-cart-item"
            size={20}
          />
          <img
            src={
              item?.image &&
              import.meta.env.VITE_R2_BUCKET_URL + "/image/" + item?.image
            }
            alt={item.title}
            className="cart-item-img"
          />
          <div className="cart-item-details">
            <p className="cart-item-title">{item.title}</p>
            <p className="cart-item-price">
              € {Math.floor(item.price * item.clientQuantity * 100) / 100}
            </p>
            <div className="cart-item-quantity">
              <button className="minus" onClick={reduce}>
                <FaMinus />
              </button>
              <p className="quantity">{item.clientQuantity || 1}</p>
              <button className="plus" onClick={increment}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
