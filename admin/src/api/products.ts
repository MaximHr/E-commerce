import type {
  ProductTResponse,
  ProductTRequestWithCollections,
	ProductTResponseWithCollectionIds,
} from "@/types/product";
import { authFetch } from "./auth";
import { checkIsForbidden, checkIsOk } from "./errorHandler";

export async function addProduct(
  product: ProductTRequestWithCollections,
): Promise<ProductTResponse> {
  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/products/upload`,
    {
      method: "POST",
      body: JSON.stringify(product),
    },
  );

  checkIsForbidden(res);
  const data = await res.json();
  checkIsOk(res, data);

  return data;
}

export async function listProducts(pageNumber: number, size: number) {
  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/products/list?page=${pageNumber}&size=${size}&sort=createdAt,desc`,
    {
      method: "GET",
    },
  );

  checkIsForbidden(res);
  const data = await res.json();
  checkIsOk(res, data);

  return data;
}

export async function deleteProduct(id: number): Promise<string> {
  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/products/${id}`,
    {
      method: "DELETE",
    },
  );

  checkIsForbidden(res);
  const data = await res.text();
  checkIsOk(res, data);

  return data;
}

export async function updateProduct(
  product: ProductTRequestWithCollections,
  id: number,
): Promise<ProductTResponse> {
  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/products/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(product),
    },
  );

  checkIsForbidden(res);
  const data = await res.json();
  checkIsOk(res, data);

  return data;
}

export async function fetchProductBySlug(
  slug: string,
): Promise<ProductTResponse> {
  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/products/${slug}`,
    {
      method: "GET",
    },
  );

  checkIsForbidden(res);
  const data = await res.json();
  checkIsOk(res, data);

  return data;
}

export async function fetchProductBySlugWithCollectionIds(
  slug: string,
): Promise<ProductTResponseWithCollectionIds> {
  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/products/withCollectionIds/${slug}`,
    {
      method: "GET",
    },
  );

  checkIsForbidden(res);
  const data = await res.json();
  checkIsOk(res, data);

  return data;
}