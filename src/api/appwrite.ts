import { Client, Databases, ID, Query } from "appwrite";
import { COLLECTION_ID, DATABASE_ID, PROJECT_ID } from "../constants/database";
import { Results } from "../types/movie";
import { API_BASE_IMAGE_URL } from "../constants/api";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID);

const database = new Databases(client);

export async function updateSearchCount(searchTerm: string, movie: Results) {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    console.log("result.documents: ", result.documents);
    console.log("result: ", result);
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
  }
}
