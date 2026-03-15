import { useNavigate } from "react-router";
import { useState } from "react";
import { handleError } from "@/api/errorHandler";
import type { ProductTRequestWithCollections } from "@/types/product";
import { addProduct } from "@/api/products";
import { ProductEdit } from "@/components/ProductEdit";

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");
  const [images, setImages] = useState<string[]>([]);
  const [titleImage, setTitleImage] = useState<string>("");
  const [chosen, setChosen] = useState<number[]>([]);

  const handleProductSubmission = async () => {
    try {
      if (price === "") {
        throw new Error("Please add a valid price");
      }
      if (quantity === "") {
        throw new Error("Please add a valid quantity");
      }

      const product: ProductTRequestWithCollections = {
        title: name,
        description,
        price,
        quantity,
				discount: (discount === "" ? 0 : discount),
        images,
        collectionsIds: chosen,
        titleImage,
      };
      await addProduct(product);
      navigate("/admin/products");
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("An error occurred. Try again later.");
      }
    }
  };

  return (
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
        shouldAdd={true}
        chosen={chosen}
        setChosen={setChosen}
      />
    </div>
  );
};

export default AddProduct;
