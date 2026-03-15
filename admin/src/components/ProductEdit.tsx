import AddProductBasicInfo from "@/components/AddProductBasicInfo.tsx";
import { MoveRight, MoveLeft, Undo2 } from "lucide-react";
import Tick from "../components/svg/Tick";
import { Button } from "./ui/button";
import { handleError } from "@/api/errorHandler";
import { useState, type Dispatch, type SetStateAction } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router";
import AssignProductToCollections from "./AssignProductToCollections";

const MAX_PAGES = 2;

interface ProductEditPropsT {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  discount: number | "";
  setDiscount: Dispatch<SetStateAction<number | "">>;
  price: number | "";
  setPrice: Dispatch<SetStateAction<number | "">>;
  quantity: number | "";
  setQuantity: Dispatch<SetStateAction<number | "">>;
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  handleProductSubmission: () => Promise<void>;
  shouldAdd: boolean;
	chosen: number[];
	setChosen: Dispatch<SetStateAction<number[]>>,
	titleImage: string,
	setTitleImage: Dispatch<SetStateAction<string>>;
}

export const ProductEdit = ({
  name,
  setName,
  price,
  setPrice,
  images,
  setImages,
  description,
  setDescription,
  discount,
  setDiscount,
  quantity,
  setQuantity,
  handleProductSubmission,
  shouldAdd,
	chosen,
	setChosen,
	titleImage,
	setTitleImage
}: ProductEditPropsT) => {
  const [page, setPage] = useState<number>(1);

  const pageHandler = (value: number) => {
    if (name.trim().length === 0) {
      handleError("Field name is required");
      return;
    } else if (price === "" || price <= 0.5) {
      handleError("Price must be at least 0.5 euro");
      return;
    } else if (description.trim().length === 0) {
      handleError("Field description is required.");
      return;
    } else if (titleImage.trim().length === 0) {
			handleError("Title image is required.")
		}
    if (discount === "") {
      setDiscount(0);
    }
    if (page == MAX_PAGES && value == 1) {
      handleProductSubmission();
    } else {
      setPage((prev) => prev + value);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="flex items-center gap-3 justify-between mb-7">
        <h1 className="text-2xl special-font">
          {shouldAdd ? "Add new product" : "Update product"}
        </h1>
        <Link to="/admin/products">
          <Button variant="default" className="flex items-center gap-2">
            Go back <Undo2 />
          </Button>
        </Link>
      </div>
      <div className="flex gap-6 mb-3">
        <div className="flex gap-2 itemce-center">
          <span
            className={`${page == 1 ? "bg-primary" : "bg-primary/30 text-muted"} transition-colors flex items-center justify-center font-normal h-7.5 w-7.5 rounded`}
          >
            {page > 1 ? <Tick /> : 1}
          </span>
          <p className="h-full flex items-center">Basic information</p>
        </div>
        <div className="flex gap-2 itemce-center">
          <span
            className={`${page == 2 ? "bg-primary" : "bg-muted text-muted"}  transition-colors flex items-center justify-center font-normal h-7.5 w-7.5 rounded`}
          >
            2
          </span>
          <p className="h-full flex items-center">Assign to collections</p>
        </div>
      </div>
      <div className="h-px max-w-lg bg-muted mb-7"></div>
      {page === 1 && (
        <AddProductBasicInfo
          name={name}
          description={description}
          quantity={quantity}
          price={price}
          discount={discount}
          images={images}
          setName={setName}
          setDescription={setDescription}
          setQuantity={setQuantity}
          setPrice={setPrice}
          setImages={setImages}
          setDiscount={setDiscount}
					titleImage={titleImage}
					setTitleImage={setTitleImage}
        />
      )}
			{
				page == 2 && (
					<AssignProductToCollections chosen={chosen} setChosen={setChosen}/>
				)
			}
      <div className="flex justify-end max-w-lg mt-3 gap-3">
        {page > 1 && (
          <Button
            variant="outline"
            type="button"
            className=" flex items-center gap-1"
            onClick={() => pageHandler(-1)}
          >
            <MoveLeft className="translate-y-px" />
            Previous step
          </Button>
        )}
        {
          <Button
            type="button"
            className="flex items-center gap-1"
            onClick={() => pageHandler(+1)}
          >
            {page < MAX_PAGES ? (
              <>
                Next step
                <MoveRight className="translate-y-px" />
              </>
            ) : shouldAdd ? (
              "Add product"
            ) : (
              "Update product"
            )}
          </Button>
        }
      </div>
    </>
  );
};
