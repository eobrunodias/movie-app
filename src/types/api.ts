import { New } from "./appwrite";

export interface ApiResponse {
  data: {
    totalArticles: number;
    articles: New[];
  };
}
