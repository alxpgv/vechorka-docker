import { settings } from "@/shared/config";
import { isDocker, isSSR } from "@/shared/lib/helpers";

export const api = {
  async get(url: string, isSSG = false) {
    const baseUrl =
      isDocker && isSSR && !isSSG
        ? process.env.API_HOST_DOCKER
        : settings.apiUrl;

    try {
      const res = await fetch(`${baseUrl}/${url}`);
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
    const baseUrl = settings.apiUrl;
    try {
      const res = await fetch(`${baseUrl}/${url}`, {
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
