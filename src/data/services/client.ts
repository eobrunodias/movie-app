import { Client, Databases } from "appwrite";
import { PROJECT_ID } from "../../constants/database";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID);

export const database = new Databases(client);
