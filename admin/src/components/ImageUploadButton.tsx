import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { uploadImages } from "@/api/images";
import { handleError } from "@/api/errorHandler";

const maxImagesPerSubmit = 10; //this limit is also set in the server. if you change it here, change it in the imageRouter as well.
const maxImagesTotal = 100;

type SingleImageProps = {
  multiple: false;
  setImagesUrl: React.Dispatch<React.SetStateAction<string>>;
  images: string;
  className?: string;
};

type MultipleImagesProps = {
  multiple: true;
  setImagesUrl: React.Dispatch<React.SetStateAction<string[]>>;
  images: string[];
  className?: string;
};

type ImageUploadButtonProps = SingleImageProps | MultipleImagesProps;

const ImageUploadButton = ({
  setImagesUrl,
  images,
  multiple,
  className,
}: ImageUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getValidFiles = (fileList: FileList | null): File[] => {
    if (!fileList || fileList.length === 0) {
      throw new Error("No image uploaded.");
    }

    if (!multiple) {
      return [fileList[0]];
    }

    if (fileList.length > maxImagesPerSubmit) {
      throw new Error(
        `Please upload up to ${maxImagesPerSubmit} images at a time.`,
      );
    }

    if (images.length > maxImagesTotal - fileList.length) {
      throw new Error(
        "You have reached the maximum number of images for this item.",
      );
    }

    return Array.from(fileList);
  };

  const handleUpload = (fileList: FileList | null) => {
    try {
      const files = getValidFiles(fileList);
      uploadImage(files);
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("An error occurred. Try again later.");
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    handleUpload(event.target.files);
  };

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);

    handleUpload(event.dataTransfer.files);
  };

  const uploadImage = async (files: File[]) => {
    setLoading(true);
    try {
      const res = await uploadImages(files);
      if (multiple) {
        setImagesUrl((prev) => [...prev, ...res]);
      } else {
        setImagesUrl(res[0]);
      }
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("An error occurred. Try again later.");
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleImageUpload(e)}
        accept="image/*"
        multiple={multiple}
        className="hidden"
      />
      <Button
        disabled={loading}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragActive(false);
        }}
        onDrop={handleDrop}
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className={`w-full h-24 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-amber-50 ${className}  ${isDragActive ? ` border-primary bg-amber-50` : ""}`}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 rounded-full bg-amber-200">
            <Upload className="w-6 h-6 text-foreground" />
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">
              {!loading && !multiple && "Upload Image"}
              {!loading && multiple && "Upload Images"}
              {loading && "Uploading..."}
            </p>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default ImageUploadButton;
