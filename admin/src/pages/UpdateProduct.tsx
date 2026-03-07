import { handleError } from "@/api/errorHandler";
import {
  fetchProductBySlugWithCollectionIds,
  updateProduct,
} from "@/api/products";
import { ProductEdit } from "@/components/ProductEdit";
import ProductNotFound from "@/components/ProductNotFound";
import type { ProductTRequestWithCollections } from "@/types/product";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const UpdateProduct = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");
  const [titleImage, setTitleImage] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [id, setId] = useState<number>();
  const [chosen, setChosen] = useState<number[]>([]);
  const [foundWrongSlug, setFoundWrongSlug] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  const handleProductSubmission = async () => {
    if (
      price === "" ||
      quantity === "" ||
      discount === "" ||
      slug === undefined ||
      id === undefined
    ) {
      return;
    }

    const updatedProduct: ProductTRequestWithCollections = {
      title: name,
      description,
      price,
      quantity,
      discount,
      images,
      collectionsIds: chosen,
			titleImage
    };

    try {
      await updateProduct(updatedProduct, id);
      navigate("/admin/products");
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("An error occurred. Try again later.");
      }
    }
  };

  const getProduct = async (slug: string) => {
    try {
      const product = await fetchProductBySlugWithCollectionIds(slug);

      setName(product.title);
      setDescription(product.description);
      setDiscount(product.discount);
      setImages(product.images);
      setQuantity(product.quantity);
			setTitleImage(product.titleImage);
      setPrice(product.price);
      setId(product.id);
      setChosen(product.collectionsIds);
    } catch {
      setFoundWrongSlug(true);
    }
    setHasLoaded(true);
  };

  useEffect(() => {
    if (slug === undefined) {
      setFoundWrongSlug(true);
    } else {
      getProduct(slug);
    }
  }, [slug]);

  return (
    <>
      {hasLoaded && foundWrongSlug ? (
        <ProductNotFound />
      ) : (
        hasLoaded && (
          <div>
            <ProductEdit
              name={name}
              setName={setName}
              price={price}
              setPrice={setPrice}
              images={images}
              setImages={setImages}
              setTitleImage={setTitleImage}
              titleImage={titleImage}
              description={description}
              setDescription={setDescription}
              discount={discount}
              setDiscount={setDiscount}
              quantity={quantity}
              setQuantity={setQuantity}
              handleProductSubmission={handleProductSubmission}
              shouldAdd={false}
              chosen={chosen}
              setChosen={setChosen}
            />
          </div>
        )
      )}
    </>
  );
};

export default UpdateProduct;
