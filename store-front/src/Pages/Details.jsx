import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import useAddToCart from "../utils/useAddToCart";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchProductBySlug } from "../utils/getData";
import Container from "../Components/Container";

// const sortTitleImageFirst = (images) => {
//   if (!images || !Array.isArray(images)) return images;

//   const index = images.findIndex((img) => img.isTitleImage);
//   if (index > 0) {
//     const temp = images[0];
//     images[0] = images[index];
//     images[index] = temp;
//   }
//   return images;
// };

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = useAddToCart();
  const [current, setCurrent] = useState(0);
  const [loaded, setLoadedImg] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);

  const loadProduct = async (slug) => {
    try {
      const data = await fetchProductBySlug(slug);
      setProduct(data);
    } catch (err) {
      setProductNotFound(true);
    }
  };

  useEffect(() => {
    loadProduct(id);
  }, [id]);

  // useEffect(() => {
  // }, [loaded]);

  return (
    <div className="details-page">
      {!productNotFound ? (
        <div className="content container">
          <div className="details-images">
            <div className="img-container-details">
              {!loaded && (
                <Skeleton enableAnimation={!product} height={"85vh"} />
              )}
              {product && product.images && (
                <div
                  className="details-img-container"
                  style={!loaded ? { display: "none" } : { display: "block" }}
                >
                  <img
                    className="details-img"
                    src={
                      import.meta.env.VITE_R2_BUCKET_URL +
                      "/image/" +
                      product.images[current]
                    }
                    onLoad={() => setLoadedImg(true)}
                    alt={product?.title}
                  />
                </div>
              )}
            </div>
            <div className="details-images-list">
              {product &&
                product.images?.length > 1 &&
                product.images.map((image, index) => {
                  return (
                    <div
                      onClick={() => setCurrent(index)}
                      key={index}
                      className={
                        current == index
                          ? "details-small-img current-img"
                          : "details-small-img"
                      }
                    >
                      <img
                        src={
                          import.meta.env.VITE_R2_BUCKET_URL + "/image/" + image
                        }
                        alt={product.title}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="details">
            <h1 className="details-title">
              {product?.title || <Skeleton enableAnimation={!product} />}
            </h1>
            <h2 className="details-price">
              {product?.price || (
                <Skeleton enableAnimation={!product} width="60px" />
              )}{" "}
              {product?.price && "€"}
            </h2>
            <p className="details-description">
              {(product?.description && parse(product.description)) || (
                <Skeleton enableAnimation={!product} count={3} />
              )}
            </p>
            {product?.quantity === 0 ? (
              <p className="details-description out-of-stock">
                Item is currently out of stock. Restock coming soon.
              </p>
            ) : (
              <button
                className="button"
                onClick={() =>
                  addToCart({ ...product, image: product.images[0] })
                }
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      ) : (
        <Container
          title="Sorry, we couldn't find this product."
          info="This item may have been removed."
          link="/"
        />
      )}
    </div>
  );
};

export default Details;
