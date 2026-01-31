import type { SignUpPayload } from "@/types/auth";
import type { UserT } from "@/types/user";
import { authFetch } from "./auth";
import { checkIsForbidden, checkIsOk } from "./errorHandler";

export async function addMember(user: SignUpPayload): Promise<UserT> {
  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/members/create-user`,
    {
      method: "POST",
      body: JSON.stringify(user),
    },
  );

  checkIsForbidden(res);
  const data = await res.json();
  checkIsOk(res, data);

  return data;
}

export async function getProfile(): Promise<UserT> {
  const res = await authFetch(`${import.meta.env.VITE_SERVER_URL}/members/me`, {
    method: "GET",
  });

  checkIsForbidden(res);
  const data = await res.json();
  checkIsOk(res, data);

  return data;
}

export async function listMembers(): Promise<UserT[]> {
  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/members/list`,
    {
      method: "GET",
    },
  );

  checkIsForbidden(res);
  const data = await res.json();
  checkIsOk(res, data);

  return data;
}

export async function kickMember(id: number): Promise<string> {
  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/members/${id}`,
    {
      method: "DELETE",
    },
  );

  checkIsForbidden(res);
  const data = await res.json();
  checkIsOk(res, data);

  return data;
}

export async function updateRole(id: number, role: string): Promise<string> {
  role = role.toUpperCase().replaceAll(" ", "_");

  const res = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/members/update-role/${id}`,
    {
      method: "PATCH",
      body: role
    },
  );

  checkIsForbidden(res);
  const data = await res.json();
  checkIsOk(res, data);

  return data;
}
