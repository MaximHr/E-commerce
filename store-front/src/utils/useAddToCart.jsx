import { useOutletContext } from "react-router-dom";

const useAddToCart = () => {
  const { cartProducts, setCartProducts, setCartToggle } = useOutletContext();

  function addToCart(cartItem) {
    if (cartItem?.id == undefined) return;
    const productExists = cartProducts.find(
      (product) => product.id === cartItem.id,
    );

    if (productExists) {
      // If the product already exists, increment the quantity
      setCartProducts(
        cartProducts.map((product) =>
          product.id === cartItem.id
            ? {
                ...product,
                clientQuantity:
                  product.clientQuantity < product.quantity
                    ? product.clientQuantity + 1
                    : product.clientQuantity,
              }
            : product,
        ),
      );
    } else {
      // If the product does not exist, add it to the cart with a quantity of 1
      setCartProducts([...cartProducts, { ...cartItem, clientQuantity: 1 }]);
    }
    setCartToggle(true);
  }

  return addToCart;
};

export default useAddToCart;
