import { FilteredNews } from "./appwrite";

export interface ApiResponse {
  data: {
    totalArticles: number;
    articles: FilteredNews[];
  };
}
