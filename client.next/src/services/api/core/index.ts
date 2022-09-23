import { settings } from "@/config";
import { isSSR } from "@/utils/helpers";

export const api = {
  async get(url: string) {
    try {
      //TODO: move to settings docker key
      const apiHost =
        !!Number(process.env.DOCKER) && isSSR
          ? process.env.API_HOST_DOCKER
          : settings.apiUrl;

      console.log("apiHost");
      console.log(apiHost);

      const res = await fetch(`${apiHost}/${url}`);
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
