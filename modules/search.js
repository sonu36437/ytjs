"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = search;
const httpClient_1 = require("../core/httpClient");
const parsers_1 = require("../utils/parsers");
async function search(query) {
    const response = await (0, httpClient_1.httpClient)("search", {
        query: query
    });
    return await (0, parsers_1.searchResponseParser)(response);
}
