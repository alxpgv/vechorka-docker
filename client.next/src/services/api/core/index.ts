import { settings } from "@/config";
import { isDocker, isSSR } from "@/utils/helpers";

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
        return Promise.reject(url);
      }
    } catch (error: any) {
      throw new Error(`Request: ${error}`);
    }
  },
};
