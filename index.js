"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var continuation_1 = require("./modules/continuation");
var player_1 = require("./modules/player");
var search_1 = require("./modules/search");
var Innertube = /** @class */ (function () {
    function Innertube() {
        this.search = search_1.search;
        this.fectchSearchContinuation = continuation_1.fetchSearchContinuation;
        this.player = player_1.fetchStreamingUrl;
    }
    return Innertube;
}());
var yt = new Innertube();
// yt.search("mr whose the boss").then(d=>{
//   console.log(d.results);
// })



 
        
 
 
    
            yt.player("veTOa38-DQw").then(function (d) {
        
                // console.log(d);
            });

    
    
        



