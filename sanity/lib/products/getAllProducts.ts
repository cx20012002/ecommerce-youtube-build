import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export const getAllProducts = async (isAll: boolean = false) => {
  const ALL_PRODUCTS_QUERY = defineQuery(`
        *[_type == "product"] | order(name asc)
        `);

  const QUERY_BY_CATEGORY = defineQuery(`
    *[_type == "cases" && $catname in categories[]->name]{
    title,
    "coverImageUrl": coverImage.asset->url,
    "categories": categories[]->name
  }`);

  console.log(isAll);

  try {
    const products = await sanityFetch({ query: ALL_PRODUCTS_QUERY });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
};
