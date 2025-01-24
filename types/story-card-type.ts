type Author = {
  _id: string;
  name: string;
  image: string;
};

export type StoryCardType = {
  _id: string;
  title: string;
  description: string;
  author: Author;
  image: string;
  views: number;
  category: string;
  _createdAt: string;
};