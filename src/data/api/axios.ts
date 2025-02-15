import axios from "axios";
import { API_BASE_URL, API_KEY } from "../../constants/api";
import { ApiResponse } from "../../types/api";
import { FilteredNews } from "../../types/appwrite";

interface AxiosConfigProps {
  endpoint: string;
}

export async function fetchApi({ endpoint }: AxiosConfigProps) {
  const response: ApiResponse = await axios.get(`${API_BASE_URL}${endpoint}`);
  return response;
}

export async function fetchNews(): Promise<FilteredNews[] | undefined> {
  try {
    const response: ApiResponse = await fetchApi({
      endpoint: `/search?q=example&lang=en&country=us&max=10&apikey=${API_KEY}`,
    });

    const articles: FilteredNews[] = response.data.articles;

    return articles;
  } catch (error) {
    console.log(error);
  }
}
