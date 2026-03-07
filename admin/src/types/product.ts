export type ProductTResponse = {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  discount: number;
  images: string[];
	titleImage: string;
  slug: string;
  createdAt: string;
};

export type ProductTRequestWithCollections = ProductTRequest & {
  collectionsIds: number[];
};

export type ProductTResponseWithCollectionIds = ProductTResponse & {
  collectionsIds: number[];
};

export type ProductTListResponse = Pick<
  ProductTResponse,
  "id" | "title" | "price" | "quantity" | "discount" | "slug" | "titleImage"
>;

type ProductTRequest = Omit<ProductTResponse, "id" | "slug" | "createdAt">;
