import { search } from "./modules/search";
class Innertube{
  public search=search;


}
const yt= new Innertube();
yt.search("shakira song").then(res=>console.log(res));






