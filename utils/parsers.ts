import { extractContinuationToken } from "./helper/continuationTokenExtractor";

export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type SearchResult = {
  title: string;
  thumbnails: Thumbnail[];
  description: string;
  id: string;
  artists?: string;

};

export async function searchResponseParser(response: any):Promise<{ results: SearchResult[], continuationToken?: string }> {
  const results: SearchResult[] = [];
  let  continuationToken: string | undefined;


  
  const sections = response.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents || [];
    // const sections = response.contents?.sectionListRenderer?.contents || [];
  
  

  for (const section of sections) {
    const items = section.itemSectionRenderer?.contents || [];

    continuationToken=extractContinuationToken(response);
    for (const item of items) {
      const video = item.videoRenderer;
      if (!video) continue;

      results.push({
        title: video.title?.runs?.[0]?.text || "",
        thumbnails: video.thumbnail?.thumbnails || [],
        description: video.descriptionSnippet?.runs?.map((r: any) => r.text).join(" ") || "",
        id: video.videoId,
        artists: video.ownerText?.runs?.[0]?.text || "",
      
      });
    }
  }

  return {results, continuationToken};
}


export function searchContinuationParser(
  response: any
): { results: SearchResult[]; continuationToken?: string } {
  const results: SearchResult[] = [];

 
  const continuationItems =
    response.onResponseReceivedCommands?.[0]?.appendContinuationItemsAction?.continuationItems ||
    response.continuationContents?.sectionListContinuation?.contents ||
    [];
    console.log("check respoine ",response.onResponseReceivedCommands?.[0]?.appendContinuationItemsAction?.continuationItems);
    

  for (const item of continuationItems[0]?.itemSectionRenderer?.contents) {
    const video = item.videoRenderer;
    if (video) {
      results.push({
        title: video.title?.runs?.[0]?.text || "",
        thumbnails: video.thumbnail?.thumbnails || [],
        description:
          video.descriptionSnippet?.runs?.map((r: any) => r.text).join(" ") || "",
        id: video.videoId,
        artists: video.ownerText?.runs?.[0]?.text || "",
      });
    }
  }

  

 
  const continuationToken =extractContinuationToken(response);
 

  return { results, continuationToken };
}