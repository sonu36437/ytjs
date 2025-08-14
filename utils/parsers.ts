import { extractContinuationToken } from "./helper/continuationTokenExtractor";
import{convertToSeconds} from './helper/convetIntoSeconds'

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
  duration?:string
  durationText?:string
 durationInSeconds?:number,
    playlistId?:string

};

export async function searchResponseParser(response: any):Promise<{ results: SearchResult[], continuationToken?: string }> {
  const results: SearchResult[] = [];
  let  continuationToken: string | undefined;



  const sections = response.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents || [];
    // const sections = response.contents?.sectionListRenderer?.contents || [];




  for (const section of sections) {
    const items = section.itemSectionRenderer?.contents || [];
    console.log("this is from serch ",items)

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
        duration:video?.lengthText?.simpleText||"",
        durationText:video?.lengthText?.accessibility?.accessibilityData?.label||"" ,
        durationInSeconds:convertToSeconds(video?.lengthText?.simpleText)||0,
          playlistId:video?.navigationEndpoint?.watchEndpoint?.playlistId
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
        duration:video?.lengthText?.simpleText||"",
        durationText:video?.lengthText?.accessibility?.accessibilityData?.label||""  ,
        durationInSeconds:convertToSeconds(video?.lengthText?.simpleText)||0,
      });
    }
  }




  const continuationToken =extractContinuationToken(response);


  return { results, continuationToken };
}

type playlistItemType={
    id:string,
    title:string,
    artist?:string,
    duration?:string,
    durationInSeconds?:number,
    thumbnail:[],
    playlistId?:string,


}
export const fetchNextParser = async (
    response: any
): Promise<playlistItemType[]> => {
    const res =
        response.contents?.twoColumnWatchNextResults?.playlist?.playlist
            ?.contents || [];

    const playlist: playlistItemType[] = res.map((item: any): playlistItemType => {
        const renderer = item.playlistPanelVideoRenderer || {};
        return {
            title: renderer.title?.simpleText || "",
            thumbnail: renderer.thumbnail?.thumbnails || [],
            artist:
                renderer.longBylineText?.runs
                    ?.map((r: any) => r.text)
                    .join(" ") || "",
            duration: renderer.lengthText?.simpleText || "",
            durationInSeconds:
                convertToSeconds(renderer.lengthText?.simpleText) || 0,
            id: renderer.videoId || "",
            playlistId:
                renderer.navigationEndpoint?.watchEndpoint?.playlistId || ""
        };
    });

    return playlist;
};
