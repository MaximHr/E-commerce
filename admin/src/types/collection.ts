import type { ProductTListResponse } from "./product";

export type CollectionWithCountT = {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  productsCount: number;
};

export type CollectionTWithProducts = {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  products: ProductTListResponse[];
};
