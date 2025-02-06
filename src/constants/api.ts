import { HttpMethod } from "../types/method-options";

export const API_BASE_URL: string = "https://api.themoviedb.org/3";

export const API_KEY: string = import.meta.env.VITE_TMBD_API_KEY;

export const API_OPTIONS: RequestInit = {
  method: "GET" as HttpMethod,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const API_BASE_IMAGE_URL: string = "https://image.tmdb.org/t/p/w500/";
