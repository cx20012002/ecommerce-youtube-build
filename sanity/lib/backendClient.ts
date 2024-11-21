import { createClient } from "next-sanity";

export const backendClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-03-25",
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});
