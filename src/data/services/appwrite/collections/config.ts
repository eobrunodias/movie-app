import {
  CONFIG_COLLECTION_ID,
  DATABASE_ID,
  NEWS_UPDATE_CONFIG_ID,
} from "../../../../constants/database";
import { database } from "../client";

export async function getNewsConfig() {
  try {
    const config = await database.getDocument(
      DATABASE_ID,
      CONFIG_COLLECTION_ID,
      NEWS_UPDATE_CONFIG_ID
    );

    return config;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateNewsConfig() {
  try {
    await database.updateDocument(
      DATABASE_ID,
      CONFIG_COLLECTION_ID,
      NEWS_UPDATE_CONFIG_ID,
      {
        lastUpdated: new Date().toISOString(),
      }
    );
  } catch (error) {
    console.error(error);
  }
}
