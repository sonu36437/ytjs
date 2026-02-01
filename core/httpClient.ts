import axios from "axios";
import { urls, apiKey, YoutubeClientContext, YoutubeAndroidClientContext } from "./constants";
import { YouTubeRequestPayload } from "../types/context";


interface QueryData {
    videoId?: string,
    query?: string,
    continuation?: string,
    playlistId?: string,

}


export async function httpClient(endpoint: string, data: QueryData, context: YouTubeRequestPayload) {
    let url = `${urls.Baseurl}/${endpoint}?prettyPrint=false`
    // if (endpoint === 'player') {
    //     url = "https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false"

    // }
    console.log(context);

    if (endpoint === 'next') {
        context.client.clientName = "WEB"
        context.client.clientVersion = "2.20250710.09.00"

    }


    if (endpoint === 'search' && data.query) {
        let formattedQuery = data?.query.trim().split(" ").filter(Boolean).join("+");
        context.client.clientName = "WEB"
        context.client.clientVersion = "2.20250710.09.00"
        context.client.originalUrl = `https://www.youtube.com/results?search_query=${formattedQuery}`
    }
    if (endpoint === 'player') {
        // context.client.clientName="ANDROID"
        // context.client.clientVersion="19.45.1"
        context.client.clientName = "ANDROID_VR"
        context.client.clientVersion = "1.62.27",
            context.client.androidSdkVersion = 33,
            context.client.platform = "MOBILE"



    }
  

    console.log(url);
    const body = {
        context,
        ...data
    };
  
    let headers: Record<string, string> = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36",
    };

    if (endpoint === "player") {
        headers["x-goog-visitor-id"] = context.client.visitorData;
    }

    console.log("this is header",headers);
    
    const res = await axios.post(url, body, {
       headers: headers


    });

    return res.data;



}
