"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchResponseParser = searchResponseParser;
exports.searchContinuationParser = searchContinuationParser;
var continuationTokenExtractor_1 = require("./helper/continuationTokenExtractor");
function searchResponseParser(response) {
    return __awaiter(this, void 0, void 0, function () {
        var results, continuationToken, sections, _i, sections_1, section, items, _a, items_1, item, video;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        return __generator(this, function (_r) {
            results = [];
            sections = ((_e = (_d = (_c = (_b = response.contents) === null || _b === void 0 ? void 0 : _b.twoColumnSearchResultsRenderer) === null || _c === void 0 ? void 0 : _c.primaryContents) === null || _d === void 0 ? void 0 : _d.sectionListRenderer) === null || _e === void 0 ? void 0 : _e.contents) || [];
            for (_i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
                section = sections_1[_i];
                items = ((_f = section.itemSectionRenderer) === null || _f === void 0 ? void 0 : _f.contents) || [];
                continuationToken = (0, continuationTokenExtractor_1.extractContinuationToken)(response);
                for (_a = 0, items_1 = items; _a < items_1.length; _a++) {
                    item = items_1[_a];
                    video = item.videoRenderer;
                    if (!video)
                        continue;
                    results.push({
                        title: ((_j = (_h = (_g = video.title) === null || _g === void 0 ? void 0 : _g.runs) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.text) || "",
                        thumbnails: ((_k = video.thumbnail) === null || _k === void 0 ? void 0 : _k.thumbnails) || [],
                        description: ((_m = (_l = video.descriptionSnippet) === null || _l === void 0 ? void 0 : _l.runs) === null || _m === void 0 ? void 0 : _m.map(function (r) { return r.text; }).join(" ")) || "",
                        id: video.videoId,
                        artists: ((_q = (_p = (_o = video.ownerText) === null || _o === void 0 ? void 0 : _o.runs) === null || _p === void 0 ? void 0 : _p[0]) === null || _q === void 0 ? void 0 : _q.text) || "",
                    });
                }
            }
            return [2 /*return*/, { results: results, continuationToken: continuationToken }];
        });
    });
}
function searchContinuationParser(response) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    var results = [];
    var continuationItems = ((_c = (_b = (_a = response.onResponseReceivedCommands) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.appendContinuationItemsAction) === null || _c === void 0 ? void 0 : _c.continuationItems) ||
        ((_e = (_d = response.continuationContents) === null || _d === void 0 ? void 0 : _d.sectionListContinuation) === null || _e === void 0 ? void 0 : _e.contents) ||
        [];
    console.log("check respoine ", (_h = (_g = (_f = response.onResponseReceivedCommands) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.appendContinuationItemsAction) === null || _h === void 0 ? void 0 : _h.continuationItems);
    for (var _i = 0, _v = (_k = (_j = continuationItems[0]) === null || _j === void 0 ? void 0 : _j.itemSectionRenderer) === null || _k === void 0 ? void 0 : _k.contents; _i < _v.length; _i++) {
        var item = _v[_i];
        var video = item.videoRenderer;
        if (video) {
            results.push({
                title: ((_o = (_m = (_l = video.title) === null || _l === void 0 ? void 0 : _l.runs) === null || _m === void 0 ? void 0 : _m[0]) === null || _o === void 0 ? void 0 : _o.text) || "",
                thumbnails: ((_p = video.thumbnail) === null || _p === void 0 ? void 0 : _p.thumbnails) || [],
                description: ((_r = (_q = video.descriptionSnippet) === null || _q === void 0 ? void 0 : _q.runs) === null || _r === void 0 ? void 0 : _r.map(function (r) { return r.text; }).join(" ")) || "",
                id: video.videoId,
                artists: ((_u = (_t = (_s = video.ownerText) === null || _s === void 0 ? void 0 : _s.runs) === null || _t === void 0 ? void 0 : _t[0]) === null || _u === void 0 ? void 0 : _u.text) || "",
            });
        }
    }
    var continuationToken = (0, continuationTokenExtractor_1.extractContinuationToken)(response);
    return { results: results, continuationToken: continuationToken };
}
