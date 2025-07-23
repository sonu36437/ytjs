
import { YouTubeFormat } from './../types/formats';
import { httpClient } from "../core/httpClient";

export async function fetchStreamingUrl(videoId: string): Promise<YouTubeFormat[]> {
    const response = await httpClient("player", { videoId: videoId });
    // console.log(response);
    
    const responseItemsWithMuxedVideoAndAudio = response.streamingData.formats;
    const responseItemsWithoutMuxedVideoAndAudio = response.streamingData.adaptiveFormats;
 
    const results: YouTubeFormat[] = [];

    for (const item of responseItemsWithMuxedVideoAndAudio) {
        const data: YouTubeFormat = {
            ...item,
            ismuxed: true,
        };

        results.push(data);
    }
    for (const item of responseItemsWithoutMuxedVideoAndAudio) {
        const data: YouTubeFormat = {
            ...item,
            ismuxed: false
        }
        results.push(data);

    }
    console.log("the result is ",results);

    return results;

}