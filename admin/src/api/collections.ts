import type { CollectionT, CollectionWithCountT } from "@/types/collection";
import { authFetch } from "./auth";
import { checkIsForbidden, checkIsOk } from "./errorHandler";

export async function createCollection(
  name: string,
  imageUrl: string,
): Promise<CollectionWithCountT> {
  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/collections`,
    {
      method: "POST",
      body: JSON.stringify({
        title: name,
        imageUrl,
        products: null,
      }),
    },
  );

  checkIsForbidden(res);
  const data = await res.json();
  checkIsOk(res, data);

  return data;
}

export async function listCollectionsWithCount(): Promise<CollectionWithCountT[]> {
  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/collections`,
    {
      method: "GET",
    },
  );

  checkIsForbidden(res);
  const data = await res.json();
  checkIsOk(res, data);

  return data;
}

export async function deleteCollection(id: number): Promise<string> {
  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/collections/${id}`,
    {
      method: "DELETE",
    },
  );

  checkIsForbidden(res);
  const data = await res.text();
  checkIsOk(res, data);

  return data;
}