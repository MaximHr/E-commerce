import { authFetch } from "./auth";
import { checkIsForbidden, checkIsOk } from "./errorHandler";

export async function uploadImages(files: File[]): Promise<string[]> {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

	const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/images/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  checkIsForbidden(res);
  const data = await res.json();
  checkIsOk(res, data);

  return data;
}

export async function deleteImage(id: string): Promise<string> {
  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/images/${id}`,
    {
      method: "DELETE",
    },
  );

  checkIsForbidden(res);
  const data = await res.json();
  checkIsOk(res, data);

  return data;
}