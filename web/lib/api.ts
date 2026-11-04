const API = process.env.NEXT_PUBLIC_API_URL!;

const getXsrf = () => {
  const m = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "";
};

export class ApiError extends Error {
  constructor(public status: number, message: string, public errors?: Record<string, string[]>) {
    super(message);
  }
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const method = (init.method ?? "GET").toUpperCase();
  if (method !== "GET" && !getXsrf()) {
    await fetch(`${API}/sanctum/csrf-cookie`, { credentials: "include" });
  }
  const res = await fetch(`${API}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": getXsrf(),
      ...init.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.message ?? res.statusText, body.errors);
  }
  return res.status === 204 ? (undefined as T) : res.json();
}