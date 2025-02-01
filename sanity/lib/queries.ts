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