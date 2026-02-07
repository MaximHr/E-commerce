import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import { fetchCollections, fetchCollectionsBySlug, fetchMostSellingProducts } from "./utils/getData";

function App() {
  const [isCartToggled, setCartToggle] = useState(false);
  const [cartProducts, setCartProducts] = useLocalStorage("cart-products", []);
  const [clickedLink, setClickLink] = useState(false);
  const [lastPos, setLastPos] = useState(0);
  const [collections, setCollections] = useState([]);
  const [storeOptions, setStoreOptions] = useState();
  const [mainProducts, setMainProducts] = useState([{}, {}, {}, {}]);

  const loadMainCategoryItems = async () => {
    try {
      const data = await fetchMostSellingProducts(4);
      setMainProducts([...data]);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const loadStoreDetails = () => {
    const storeId = JSON.parse(
      document.querySelector('meta[name="store-id"]')?.getAttribute("content")
    );

    const primaryColor = document
      .querySelector('meta[name="primary-color"]')
      ?.getAttribute("content");

    const secondaryColor = document
      .querySelector('meta[name="secondary-color"]')
      ?.getAttribute("content");

    const title = document.title;

    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty(
      "--secondary-color",
      secondaryColor
    );

    setStoreOptions({
      id: storeId,
      primaryColor,
      secondaryColor,
      storeName: title,
    });
  };

  const loadCollections = async () => {
    try {
      const data = await fetchCollections();
      setCollections(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    loadStoreDetails();
    loadMainCategoryItems();
    loadCollections();
  }, []);

  return (
    <div>
      <ScrollRestoration />
      <ToastContainer />

      <Navbar
        collections={collections}
        setCartToggle={setCartToggle}
        cartProducts={cartProducts}
        storeName={storeOptions?.storeName}
      />

      <Outlet
        context={{
          cartProducts,
          setCartProducts,
          setCartToggle,
          collections,
          storeOptions,
          setClickLink,
          clickedLink,
          lastPos,
          setLastPos,
          mainProducts,
        }}
      />

      <Cart
        setProducts={setCartProducts}
        products={cartProducts}
        isCartToggled={isCartToggled}
        setCartToggle={setCartToggle}
      />

      <Footer />
    </div>
  );
}

export default App;
