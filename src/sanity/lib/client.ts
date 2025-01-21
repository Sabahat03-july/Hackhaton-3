import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';  // Ensure the correct file path

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,  // Disable CDN caching if you want fresh data
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN // Ensure this token is set in your .env file
});
