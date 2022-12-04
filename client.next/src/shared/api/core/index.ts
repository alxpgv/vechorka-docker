import { settings } from "@/shared/config";

export const api = {
  async get(url: string) {
    try {
      const res = await fetch(`${settings.apiUrl}/${url}`);
      if (res.ok) {
        return await res.json();
      } else {
        return Promise.reject(
          `${url}${res.statusText && `: ${res.statusText}`}`
        );
      }
    } catch (error) {
      throw new Error(`Request: ${error}`);
    }
  },
  async post(url: string, body: Record<string, unknown>) {
    try {
      const res = await fetch(`${settings.apiUrl}/${url}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (res.ok) {
        return json;
      } else {
        return Promise.reject(json);
      }
    } catch (error) {
      throw new Error(`Request: ${error}`);
    }
  },
};
