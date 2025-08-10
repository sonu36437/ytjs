import InnertubeSession from "./modules/Session";
import { SearchResult } from "./utils/parsers";

export class Innertube {
  private session!: InnertubeSession;

  private haveSession: boolean = false;
  private async getSession(){
    if(!this.haveSession){
      this.session= await InnertubeSession.getInstance();
      this.haveSession=!this.haveSession;
    
    }


  }

public  async search(query: string) {
    if(!this.haveSession){
      await this.getSession();
    }
 
    return this.session.searchQuery(query);
  }

public  async player(videoId: string) {
    if(!this.haveSession){
      await this.getSession();
    }
    return this.session.fetchStreamingUrl(videoId);
  }

  async fectchSearchContinuation(token:string):Promise<{ results: SearchResult[], continuationToken?: string }>{
    if(!this.haveSession){
      await this.getSession();
    }
    return this.session.fetchSearchContinuation(token);
  }
 
}
