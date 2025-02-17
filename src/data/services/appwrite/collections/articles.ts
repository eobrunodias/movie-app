import { ID, Models, Query } from "appwrite";
import {
  ARTICLES_COLLECTION_ID,
  DATABASE_ID,
} from "../../../../constants/database";
import { FilteredNews } from "../../../../types/appwrite";
import { uniqueId } from "../../../../utils/uniqueId";
import { database } from "../client";

export async function getNews(): Promise<FilteredNews[]> {
  try {
    const articles = await database.listDocuments<Models.Document>(
      DATABASE_ID,
      ARTICLES_COLLECTION_ID
    );

    const filteredData = articles.documents.map(
      ({ content, description, image, title, url, publishedAt, $id }) => ({
        id: uniqueId(title),
        $id,
        content,
        description,
        image,
        title,
        url,
        publishedAt,
      })
    );

    return filteredData;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function saveNews(newsData: FilteredNews[]): Promise<void> {
  try {
    for (const news of newsData) {
      const existingArticles = await database.listDocuments<Models.Document>(
        DATABASE_ID,
        ARTICLES_COLLECTION_ID,
        [Query.equal("title", news.title)]
      );

      if (existingArticles.documents.length > 0) {
        continue;
      }

      await database.createDocument(
        DATABASE_ID,
        ARTICLES_COLLECTION_ID,
        ID.unique(),
        {
          title: news.title,
          description: news.description,
          content: news.content,
          url: news.url,
          image: news.image,
          publishedAt: news.publishedAt,
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateNews(
  newsToUpdate: FilteredNews[],
  newsData: FilteredNews[]
): Promise<void> {
  try {
    const updatePromises = newsData.map((news, index) => {
      const $id = newsToUpdate[index].$id;
      return database.updateDocument(DATABASE_ID, ARTICLES_COLLECTION_ID, $id, {
        title: news.title,
        description: news.description,
        content: news.content,
        url: news.url,
        image: news.image,
        publishedAt: news.publishedAt,
      });
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.log(error);
  }
}
