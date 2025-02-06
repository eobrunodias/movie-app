import { API_BASE_URL } from "../constants/api";

export function getMovieEndpoint(query: string): string {
  const endpoint: string = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

  return endpoint;
}
