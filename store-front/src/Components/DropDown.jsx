import { Link } from "react-router-dom";

export const DropDown = ({ categories }) => {
  return (
    <div className="dropdown-container">
      <div className="dropdown">
        {categories.map((category, i) => {
          return (
            <Link
              key={i}
              to={`collections/${category.slug}`}
              className="dropdown-item"
            >
              {category.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
