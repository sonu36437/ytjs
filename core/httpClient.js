"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = httpClient;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("./constants");
async function httpClient(endpoint, data) {
    const url = `${constants_1.urls.Baseurl}/${endpoint}?key=${constants_1.apiKey}`;
    console.log(constants_1.YoutubeClientContext);
    const body = {
        context: constants_1.YoutubeClientContext,
        ...data
    };
    console.log(body);
    const res = await axios_1.default.post(url, body, {
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36"
        },
    });
    return res.data;
}
