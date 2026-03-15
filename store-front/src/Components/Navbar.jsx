import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { DropDown } from "./DropDown.jsx";
import { Sidebar } from "./Sidebar.jsx";
import SearchResults from "./SearchResults.jsx";
import { toast } from "react-toastify";
import { getSearchResult } from "../utils/getData.js";
import { IoClose } from "react-icons/io5";

const SEARCH_BREAKING_POINT = 1024;
const API_CALL_DELAY = 300;

const Navbar = ({ setCartToggle, cartProducts, collections, storeName }) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [dropped, setDropped] = useState(false);
  const [mobileSearchOpened, setMobileSearchOpened] = useState(false);

  const searchRef = useRef(null);

  let location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > SEARCH_BREAKING_POINT) {
        setResults([]);
        setMobileSearchOpened(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const search = async (query) => {
    try {
      const res = await getSearchResult(query);
      setResults(res);
      setShowResults(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    setSidebar(false);
  }, [location]);

  const toggleSearch = () => {
    if (window.innerWidth <= SEARCH_BREAKING_POINT) {
      setMobileSearchOpened((prev) => !prev);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, API_CALL_DELAY);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    if (debouncedValue.trim().length === 0) {
      setResults([]);
      setShowResults(false);
      return;
    }

    search(debouncedValue);
  }, [debouncedValue]);

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (!value.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setShowResults(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!searchValue.trim()) {
        setResults([]);
        setShowResults(false);
        return;
      }

      search(searchValue);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <Sidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        categories={collections}
      />

      <div className="flex-start">
        <div className="hamburger" onClick={() => setSidebar(true)}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>

        <Link to="/" className="logo">
          <p>{storeName}</p>
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
        <div
          className="magnifying-glass mobile-search-btn"
          onClick={toggleSearch}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div
          className="searchbar-container"
          style={mobileSearchOpened ? { display: "flex" } : {}}
          ref={searchRef}
        >
          <div onClick={() => setMobileSearchOpened(false)} className="close-mobile close-cart">
            <IoClose size={27} />
          </div>
          <div className="searchbar">
            <div className="magnifying-glass">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <input
              value={searchValue}
              onChange={searchHandler}
              onKeyDown={handleKeyDown}
              type="text"
              className="search-input"
              placeholder="Search..."
            />
          </div>

          <SearchResults
            results={results}
            onResultClick={() => setShowResults(false)}
            isOpen={showResults}
          />
        </div>

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
