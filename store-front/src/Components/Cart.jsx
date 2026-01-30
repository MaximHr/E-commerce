import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import CartItem from "./CartItem";

const Cart = ({ setCartToggle, isCartToggled, products, setProducts }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let ammount = 0;
    for (let i = 0; i < products.length; i++) {
      ammount += products[i].price * products[i].clientQuantity;
    }
    setTotal(Math.round(ammount * 100) / 100);
  }, [products]);

  const closeCart = (e) => {
    if (e.target.className == "cart-overlay") {
      setCartToggle(false);
    }
  };
  return (
    <div
      className={isCartToggled ? "cart-overlay" : ""}
      onClick={(e) => closeCart(e)}
    >
      <div
        className="cart"
        style={
          isCartToggled
            ? { transform: "translateX(0%)" }
            : { transform: "translateX(100%)" }
        }
      >
        <div className="cart-top">
          <h2 className="cart-title">Shopping Bag</h2>
          <IoClose
            className="close-cart"
            size={35}
            onClick={() => setCartToggle(false)}
          />
        </div>
        <div className="cart-content">
          {products.map((product, i) => {
            return (
              <CartItem
                key={i}
                item={product}
                setProducts={setProducts}
                products={products}
              />
            );
          })}
        </div>
        {products.length > 0 ? (
          <div className="cart-bottom">
            <h2 className="cart-title">
              Total: € <span className="cart-total">{total}</span>
            </h2>
            <button className="button">Checkout</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Cart;
