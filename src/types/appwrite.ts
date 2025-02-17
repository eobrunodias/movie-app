export interface FilteredNews {
  $id: string;
  id?: string;
  content: string;
  description: string;
  image: string;
  title: string;
  url: string;
  publishedAt: string;
  count?: number;
}

export interface Source {
  name: string;
  url: string;
}
