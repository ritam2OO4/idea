import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || title match $search || authour->name match $search ] | order(_createdAt desc){
  _createdAt,
    author->{
    _id,name,image,bio
    },
    _id,
    title,
    slug,
    views,
    description,
    category,
    image,
    
}`)
export const STARTUP_QUERY_BY_ID = defineQuery(`*[_type == "startup" && _id == $id][0]{
  _createdAt,
    author->{
    _id,name,image,bio,username
    },
    _id,
    title,
    slug,
    views,
    description,
    category,
    image,
    pitch
    
}`)
export const STARTUP_VIEWS_QUERY = defineQuery(`*[_type == "startup" && _id == $id][0]{
  views,_id
  }`)

  export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`*[_type == "author" && _id == $id][0]{
    _id,
    id,
    image,
    bio,
    name,
    username,
    email,
    }`)