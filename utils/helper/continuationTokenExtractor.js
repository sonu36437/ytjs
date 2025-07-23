"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractContinuationToken = extractContinuationToken;
function extractContinuationToken(response) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    try {
        var continuationItems = ((_d = (_c = (_b = (_a = response.contents) === null || _a === void 0 ? void 0 : _a.twoColumnSearchResultsRenderer) === null || _b === void 0 ? void 0 : _b.primaryContents) === null || _c === void 0 ? void 0 : _c.sectionListRenderer) === null || _d === void 0 ? void 0 : _d.contents) ||
            ((_g = (_f = (_e = response.onResponseReceivedCommands) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.appendContinuationItemsAction) === null || _g === void 0 ? void 0 : _g.continuationItems);
        console.log("from extractor,", continuationItems);
        for (var _i = 0, continuationItems_1 = continuationItems; _i < continuationItems_1.length; _i++) {
            var section = continuationItems_1[_i];
            var continuation = (_k = (_j = (_h = section.continuationItemRenderer) === null || _h === void 0 ? void 0 : _h.continuationEndpoint) === null || _j === void 0 ? void 0 : _j.continuationCommand) === null || _k === void 0 ? void 0 : _k.token;
            if (continuation)
                return continuation;
        }
    }
    catch (e) { }
    return undefined;
}
