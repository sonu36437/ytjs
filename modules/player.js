"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStreamingUrl = fetchStreamingUrl;
const httpClient_1 = require("../core/httpClient");
async function fetchStreamingUrl(videoId) {
    const response = await (0, httpClient_1.httpClient)("player", { videoId: videoId });
    // console.log(response);
    const responseItemsWithMuxedVideoAndAudio = response.streamingData.formats;
    const responseItemsWithoutMuxedVideoAndAudio = response.streamingData.adaptiveFormats;
    const results = [];
    for (const item of responseItemsWithMuxedVideoAndAudio) {
        const data = {
            ...item,
            ismuxed: true,
        };
        results.push(data);
    }
    for (const item of responseItemsWithoutMuxedVideoAndAudio) {
        const data = {
            ...item,
            ismuxed: false
        };
        results.push(data);
    }
    console.log("the result is ", results);
    return results;
}
