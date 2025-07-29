"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSearchContinuation = fetchSearchContinuation;
const httpClient_1 = require("../core/httpClient");
const continuationTokenExtractor_1 = require("../utils/helper/continuationTokenExtractor");
const parsers_1 = require("../utils/parsers");
async function fetchSearchContinuation(token) {
    const response = await (0, httpClient_1.httpClient)("search", { continuation: token });
    const results = (0, parsers_1.searchContinuationParser)(response);
    const continuation = (0, continuationTokenExtractor_1.extractContinuationToken)(response);
    return results;
}
