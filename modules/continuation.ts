import { httpClient } from "../core/httpClient";
import { extractContinuationToken } from "../utils/helper/continuationTokenExtractor";
import { searchContinuationParser, searchResponseParser } from "../utils/parsers";


export async function fetchSearchContinuation(token: string) {
  const response = await httpClient("search", { continuation: token });

  
  const results =  searchContinuationParser(response);

  const continuation = extractContinuationToken(response);
  return results;



   
}