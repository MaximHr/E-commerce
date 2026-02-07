import { type LogInPayload } from "../types/auth";
import { checkIsForbidden } from "./errorHandler";

export async function login(user: LogInPayload): Promise<string> {
  if (!user.email.trim()) {
    throw new Error("Email can not be empty.");
  }

  if (user.password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user.email, password: user.password }),
  });

  checkIsForbidden(res);

  const data = await res.json();

  if (res.status === 200) {
    return data.message;
  } else {
    throw new Error(data.messages);
  }
}

export function authFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  if (token == null) {
    location.href = "/access-denied";
  }

  const headers = new Headers(options.headers || {});

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  headers.set("Authorization", `Bearer ${token}`);

  return fetch(url, {
    ...options,
    headers,
  });
}
