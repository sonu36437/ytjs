import { httpClient } from "../core/httpClient";
import { SearchResult, searchResponseParser } from '../utils/parse';

export async function search(query: string) {
  const response = await httpClient("search", {
    query: query
  });

  return await searchResponseParser(response);
}
