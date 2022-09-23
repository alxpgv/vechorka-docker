import { settings } from "@/config";

export const api = {
  async get(url: string) {
    try {
      const res = await fetch(`${settings.apiUrl}/${url}`);
      if (res.ok) {
        return await res.json();
      } else {
        return Promise.reject(url);
      }
    } catch (error: any) {
      throw new Error(`Request: ${error}`);
    }
  },
};
