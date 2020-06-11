export type Repo = {
    id: number;
    title: string;
    author: string;
    description: string;
    topic: string;
    url: string;
  }
  export type Query = {
      allRepos: Repo[];
  }