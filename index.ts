
import { fetchSearchContinuation } from "./modules/continuation";
import { fetchStreamingUrl } from "./modules/player";
import { search } from "./modules/search";
class Innertube{
  public search=search;
  public fectchSearchContinuation=fetchSearchContinuation;
  public player=fetchStreamingUrl;

}
const yt= new Innertube();
// yt.search("mr whose the boss").then(d=>{
//   console.log(d.results);
  
// })
yt.player("g5skXHWcDrk").then(d=>{
  // console.log(d);
  
})







