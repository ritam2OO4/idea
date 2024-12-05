import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current)] | order(_createdAt desc){
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