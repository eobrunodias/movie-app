import { Client, Databases, ID, Query } from "appwrite";
import { COLLECTION_ID, DATABASE_ID, PROJECT_ID } from "../constants/database";
import { Results } from "../types/movie";
import { API_BASE_IMAGE_URL } from "../constants/api";
import { MetricsModel } from "../types/metrics-model";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID);

const database = new Databases(client);

export async function updateSearchCount(
  searchTerm: string,
  movie: Results
): Promise<void> {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_path: `${API_BASE_IMAGE_URL}${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error(error);
    return;
  }
}
export async function getTrendingMovies(): Promise<MetricsModel[] | undefined> {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return result.documents as MetricsModel[];
  } catch (error) {
    console.error(error);
  }
}
