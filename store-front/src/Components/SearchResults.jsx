import { useNavigate } from "react-router-dom";

const SearchResults = ({ results, onResultClick, isOpen }) => {
  const navigate = useNavigate();

  if (!isOpen || !results || results?.length === 0) {
    return null;
  }

  const handleProductClick = (slug) => {
    navigate(`/details/${slug}`);
    onResultClick();
  };

  return (
    <div className="search-results-list">
      {results.map((item) => (
        <div
          key={item.id}
          className="search-result-row"
          onClick={() => handleProductClick(item.slug)}
        >
          <div className="search-img-container">
            <img
              src={
                item.titleImage &&
                import.meta.env.VITE_R2_BUCKET_URL + "/image/" + item.titleImage
              }
              alt={item.title}
            />
          </div>
          <div className="search-result-list-info">
            <h4 className="search-result-list-title">{item.title}</h4>
            <h4 className="search-result-list-price">{item.price} €</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
