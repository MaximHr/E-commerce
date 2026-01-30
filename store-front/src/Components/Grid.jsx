import { Link, useOutletContext } from "react-router-dom";
import getColor from "../utils/getColor";

const Grid = () => {
  const { collections, storeOptions } = useOutletContext();
  return (
    <div className="grid container">
      {collections.map((banner, i) => {
        return (
          <div
            className="secondary-banner"
            key={banner.id}
            style={{
              backgroundColor: getColor(storeOptions?.secondaryColor, i),
            }}
          >
            <p>{banner.title}</p>
            <img
              className="secondary-banner-img"
              src={
                import.meta.env.VITE_R2_BUCKET_URL +
                "/image/" +
                banner.imageUrl
              }
              alt={banner.title}
            />
            <Link to={`/collections/${banner.slug}`} className="button">
              {banner.btnText || "Shop now"}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
