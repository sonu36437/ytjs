import { httpClient } from "../core/httpClient";
import { SearchResult, searchResponseParser } from '../utils/parsers';

export async function search(query: string) {
  const response = await httpClient("search", {
    query: query
  });

  return await searchResponseParser(response);
}
