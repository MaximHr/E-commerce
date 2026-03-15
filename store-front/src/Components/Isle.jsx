import Product from "./Product";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const Isle = ({
  title,
  items,
  advancedOptions,
  setSortBy,
  setOrder,
  totalElements,
}) => {
  const sort = (e) => {
    if (e.target.value == "low-to-high") {
      setSortBy("price");
      setOrder("asc");
    } else if (e.target.value == "high-to-low") {
      setSortBy("price");
      setOrder("desc");
    } else if (e.target.value == "recent") {
      setSortBy("createdAt");
      setOrder("desc");
    }
  };

  return (
    <div>
      <div className="isle container">
        <div className="isle-title">
          <h2>
            {title} {totalElements ? `(${totalElements})` : ""}
          </h2>
          {advancedOptions ? (
            <div className="sort-selector">
              <select
                className="minimal"
                name="sort-select"
                id="sort-select"
                onChange={(e) => sort(e)}
              >
                <option value="recent">Most recent</option>
                <option value="low-to-high">Price (low to high)</option>
                <option value="high-to-low">Price (high to low)</option>
              </select>
            </div>
          ) : (
            <Link className="view-all" to="/products">
              View all <FaArrowRight />
            </Link>
          )}
        </div>
        <div className="isle-list">
          {items?.map((item, i) => {
            return <Product item={item} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Isle;
