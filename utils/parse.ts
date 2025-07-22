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

  for (const section of sections) {
    const items = section.itemSectionRenderer?.contents || [];
      if (section.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token) {
      continuationToken = section.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
    }

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
