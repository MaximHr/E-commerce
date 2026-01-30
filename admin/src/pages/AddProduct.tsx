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
  const [chosen, setChosen] = useState<number[]>([]);

  const handleProductSubmission = async () => {
    if (price === "" || quantity === "" || discount === "") return;

    try {
      const product: ProductTRequestWithCollections = {
        title: name,
        description,
        price,
        quantity,
        discount,
        images,
				collectionsIds: chosen
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
