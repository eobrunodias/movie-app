export interface FilteredNews {
  id?: string;
  content: string;
  description: string;
  image: string;
  title: string;
  url: string;
  publishedAt: string;
}

export interface Source {
  name: string;
  url: string;
}
