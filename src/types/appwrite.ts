export interface News {
  total: number;
  documents: New[];
}

export interface New {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

export interface Source {
  name: string;
  url: string;
}
