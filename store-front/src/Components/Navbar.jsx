import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { DropDown } from "./DropDown.jsx";
import { Sidebar } from "./Sidebar.jsx";

const searchBreakingPoint = 1024;

const Navbar = ({ setCartToggle, cartProducts, collections, storeName }) => {
  const [searchValue, setSearchValue] = useState("");
  let location = useLocation();

  useEffect(() => {
    setSidebar(false);
  }, [location]);

  const openSearch = () => {
    if (window.innerWidth <= searchBreakingPoint) {
      console.log("now");
    }
  };

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
    console.log(e.target.value);
  };

  const [sidebar, setSidebar] = useState(false);
  const [dropped, setDropped] = useState(false);

  return (
    <div className="navbar">
      {
        <Sidebar
          sidebar={sidebar}
          setSidebar={setSidebar}
          categories={collections}
        />
      }
      <div className="flex-start">
        <div className="hamburger" onClick={() => setSidebar(true)}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
        <Link to="/" className="logo">
          <p>{storeName} </p>
        </Link>
        <div className="together">
          {dropped && (
            <>
              <DropDown categories={collections} />
              <div className="outside" onClick={() => setDropped(false)}></div>
            </>
          )}
          <div
            className="nav-item nav-dropdown-trigger"
            onClick={() => setDropped((prev) => !prev)}
          >
            <p style={dropped ? { color: "var(--primary-color)" } : {}}>
              Collections
            </p>
            <i
              style={dropped ? { color: "var(--primary-color)" } : {}}
              className="fa-solid fa-chevron-down"
            ></i>
          </div>
          <div className="line-vertical"></div>
          <Link to="/products" className="nav-item">
            All Products
          </Link>
          <div className="line-vertical"></div>
          <HashLink to="/#about" className="nav-item">
            About
          </HashLink>
        </div>
      </div>
      <div className="flex-end">
        <div className="searchbar">
          <div className="magnifying-glass" onClick={openSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            value={searchValue}
            onChange={(e) => searchHandler(e)}
            type="text"
            className="search-input"
            placeholder="Search..."
          />
        </div>
        {/* <Link to="/signin"><i className="fa-regular fa-user"></i></Link> */}
        {/* <a href="/"><i className="fa-regular fa-heart"></i></a> */}
        <div
          className="cart-btn"
          onClick={() => setCartToggle((prev) => !prev)}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <div className="purchased-number">{cartProducts?.length || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
