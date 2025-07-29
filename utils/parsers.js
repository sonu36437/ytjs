"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchResponseParser = searchResponseParser;
exports.searchContinuationParser = searchContinuationParser;
const continuationTokenExtractor_1 = require("./helper/continuationTokenExtractor");
async function searchResponseParser(response) {
    const results = [];
    let continuationToken;
    const sections = response.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents || [];
    for (const section of sections) {
        const items = section.itemSectionRenderer?.contents || [];
        continuationToken = (0, continuationTokenExtractor_1.extractContinuationToken)(response);
        for (const item of items) {
            const video = item.videoRenderer;
            if (!video)
                continue;
            results.push({
                title: video.title?.runs?.[0]?.text || "",
                thumbnails: video.thumbnail?.thumbnails || [],
                description: video.descriptionSnippet?.runs?.map((r) => r.text).join(" ") || "",
                id: video.videoId,
                artists: video.ownerText?.runs?.[0]?.text || "",
            });
        }
    }
    return { results, continuationToken };
}
function searchContinuationParser(response) {
    const results = [];
    const continuationItems = response.onResponseReceivedCommands?.[0]?.appendContinuationItemsAction?.continuationItems ||
        response.continuationContents?.sectionListContinuation?.contents ||
        [];
    console.log("check respoine ", response.onResponseReceivedCommands?.[0]?.appendContinuationItemsAction?.continuationItems);
    for (const item of continuationItems[0]?.itemSectionRenderer?.contents) {
        const video = item.videoRenderer;
        if (video) {
            results.push({
                title: video.title?.runs?.[0]?.text || "",
                thumbnails: video.thumbnail?.thumbnails || [],
                description: video.descriptionSnippet?.runs?.map((r) => r.text).join(" ") || "",
                id: video.videoId,
                artists: video.ownerText?.runs?.[0]?.text || "",
            });
        }
    }
    const continuationToken = (0, continuationTokenExtractor_1.extractContinuationToken)(response);
    return { results, continuationToken };
}
