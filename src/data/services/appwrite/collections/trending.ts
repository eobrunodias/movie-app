import { ID, Models, Query } from "appwrite";

import {
  DATABASE_ID,
  TRENDING_COLLECTION_ID,
} from "../../../../constants/database";
import { database } from "../client";
import { FilteredNews } from "../../../../types/appwrite";
import { uniqueId } from "../../../../utils/uniqueId";

export async function getTrending(): Promise<FilteredNews[]> {
  try {
    const listTrending = await database.listDocuments(
      DATABASE_ID,
      TRENDING_COLLECTION_ID,
      [Query.orderDesc("count")]
    );

    const filteredData = listTrending.documents.map(
      ({
        content,
        description,
        image,
        title,
        url,
        publishedAt,
        count,
        $id,
      }) => ({
        id: uniqueId(title),
        $id,
        content,
        description,
        image,
        title,
        url,
        publishedAt,
        count,
      })
    );

    return filteredData;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function saveTrending(newData: FilteredNews) {
  try {
    const existingTrending = await database.listDocuments(
      DATABASE_ID,
      TRENDING_COLLECTION_ID,
      [Query.equal("title", newData.title)]
    );

    if (existingTrending.documents.length > 0) {
      const matchTrending = existingTrending.documents.find(
        (trending) => trending.title === newData.title
      );

      if (matchTrending) {
        incrementCountTrending(matchTrending);
        return;
      }
      return;
    }

    await database.createDocument(
      DATABASE_ID,
      TRENDING_COLLECTION_ID,
      ID.unique(),
      {
        title: newData.title,
        description: newData.description,
        content: newData.content,
        url: newData.url,
        image: newData.image,
        publishedAt: newData.publishedAt,
      }
    );

    return;
  } catch (error) {
    console.error(error);
  }
}

export async function incrementCountTrending(newData: Models.Document) {
  try {
    if (!newData?.$id) {
      throw new Error("Invalid document ID");
    }

    await database.updateDocument(
      DATABASE_ID,
      TRENDING_COLLECTION_ID,
      newData.$id,
      {
        count: (newData.count ?? 0) + 1,
      }
    );
  } catch (error) {
    console.error("Error updating trending count:", error);
  }
}
