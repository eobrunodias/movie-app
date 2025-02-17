import axios from "axios";
import { ApiResponse } from "../../types/api";
import { FilteredNews } from "../../types/appwrite";

export async function fetchNews(): Promise<FilteredNews[] | undefined> {
  try {
    const response: ApiResponse = await axios.get("/news");

    const articles: FilteredNews[] = response.data.articles;

    return articles;
  } catch (error) {
    console.log(error);
  }
}
