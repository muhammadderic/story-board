import { defineQuery } from "next-sanity";

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type == "author" && _id match $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`);

export const STORIES_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "story" && author._ref == $id] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  category,
}`);