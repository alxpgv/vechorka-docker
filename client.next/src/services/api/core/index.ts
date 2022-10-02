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
      console.log("params");
      console.log(isDocker, isSSR, isSSG);
      console.log("url");
      console.log(`${baseUrl}/${url}`);
      if (res.ok) {
        const data = await res.json();
        console.log("data");
        console.log(data);
        return data;
      } else {
        return Promise.reject(url);
      }
    } catch (error: any) {
      throw new Error(`Request: ${error}`);
    }
  },
};
