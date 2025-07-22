

import { fetchSearchContinuation } from "./modules/continuation";
import { search } from "./modules/search";
class Innertube{
  public search=search;
  public fectchSearchContinuation=fetchSearchContinuation;

}
const yt= new Innertube();
yt.search("mr whose the boss").then(d=>{
  console.log(d.results[0]);
  
})







