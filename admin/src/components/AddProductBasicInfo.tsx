import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Editor, {
	BtnBold,
	BtnItalic,
	BtnUnderline,
	BtnBulletList,
	BtnNumberedList,
	Toolbar
} from "react-simple-wysiwyg"
import { Trash } from "lucide-react";
import ImageUploadButton from "@/components/ImageUploadButton";
import { deleteImage } from "@/api/images";

const AddProductBasicInfo = ({
	name,
	description,
	quantity,
	discount,
	price,
	setName,
	setDescription,
	setDiscount,
	images,
	setQuantity,
	setPrice,
	setImages
} : {
	name : string,
	images: string[],
	discount: number | "",
	description : string,
	quantity: number | "",
	price: number | "",
	setName: React.Dispatch<React.SetStateAction<string>>,
	setDescription: React.Dispatch<React.SetStateAction<string>>,
	setQuantity: React.Dispatch<React.SetStateAction<number | "">>,
	setPrice: React.Dispatch<React.SetStateAction<number | "">>,
	setDiscount: React.Dispatch<React.SetStateAction<number | "">>,
	setImages: React.Dispatch<React.SetStateAction<string[]>>,
}) => {
	const removeImage = async(img: string) => {
		try {
			const updatedImages = images.filter(image => image != img);
			setImages([...updatedImages]);
			await deleteImage(img);
		} catch(err) {
			console.log(err);
		}
	}

	return (
		<form className="grid gap-6" onSubmit={e => e.preventDefault()}>
			<div className="flex-col lg:flex-row flex gap-6 max-w-lg">
				<div className="grid gap-3 flex-1/2">
					<Label htmlFor="name">Name</Label>
					<Input 
						id="name" 
						type="text" 
						placeholder="Short sleeve t-shirt"
						required 
						value={name}
						onChange={(e: React.ChangeEvent<HTMLInputElement >) => setName(e.target.value)}
					/>
				</div>
				<div className="grid gap-3 flex-1/2">
					<Label htmlFor="price">Price (€)</Label>
					<Input 
						id="price" 
						min={0}
						placeholder="0.00"
						type="number" 
						required 
						value={price}
						onChange={(e: React.ChangeEvent<HTMLInputElement >) => setPrice(Number(e.target.value))}
					/>
				</div>
			</div>
			<div className="flex gap-6 max-w-lg flex-col lg:flex-row">
				<div className="grid gap-3 flex-1/2">
					<Label htmlFor="quantity">Quantity</Label>
					<Input 
						id="quantity" 
						type="number" 
						min={0}
						placeholder="Leave empty to ignore quantity"
						value={quantity}
						onChange={(e: React.ChangeEvent<HTMLInputElement >) => setQuantity(Number(e.target.value))}
					/>
				</div>
				<div className="grid gap-3 flex-1/2">
					<Label htmlFor="discount">Discount (%)</Label>
					<Input 
						id="discount" 
						type="number" 
						min={0}
						max={100}
						placeholder="0"
						required 
						value={discount}
						onChange={(e: React.ChangeEvent<HTMLInputElement >) => setDiscount(Number(e.target.value))}
					/>
				</div>
			</div>
			<div className="grid gap-3">
				<Label htmlFor="image-btn">Upload images</Label>
				<ImageUploadButton 
					images={images}
					className="max-w-lg h-[125px]" 
					multiple={true} 
					setImagesUrl={setImages}
				/>
				{images.length != 0 && <div className="max-w-lg grid grid-cols-2 md:grid-cols-3 gap-2 ">
					{images.map((img) => (
						<div key={img} className="border relative aspect-square overflow-hidden">
							<img
								className="p-2 w-full h-full object-contain"
								src={`${import.meta.env.VITE_R2_URL}/image/${img}`}
								alt="product image"
							/>
							<div
								className="absolute top-1 right-1 cursor-pointer p-1 hover:text-destructive bg-white/75 transition-colors duration-75 rounded"
								onClick={() => removeImage(img)}
							>
								<Trash size={14} />
							</div>
						</div>
					))}
				</div>}

			</div>
			<div className="grid gap-3">
				<Label htmlFor="description">Description</Label>
				<Editor
					value={description} 
					onChange={e => setDescription(e.target.value)} 
				>
					<Toolbar>
						<BtnBold/>
						<BtnItalic/>
						<BtnUnderline/>
						<BtnBulletList/>
						<BtnNumberedList/>
					</Toolbar>
				</Editor>
			</div>
		</form>
	)
}

export default AddProductBasicInfo;