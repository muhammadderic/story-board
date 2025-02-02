import { defineQuery } from "next-sanity";

// Fetch all stories
export const STORIES_QUERY =
  defineQuery(`*[_type == "story" && defined(slug.current)] | order(_createdAt desc) {
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

// Fetch stories by search
export const STORIES_BY_SEARCH_QUERY =
  defineQuery(`*[_type == "story" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
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

export const STORY_BY_ID_QUERY = defineQuery(`
  *[_type == "story" && _id == $id][0]{
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  }, 
  views,
  category,
  story,
  }
`)

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