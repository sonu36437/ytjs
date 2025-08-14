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

public  async search(query: string)   {
    if(!this.haveSession){
      await this.getSession();
    }

    return  await this.session.searchQuery(query);
  }

public  async player(videoId: string) {
    if(!this.haveSession){
      await this.getSession();
    }
    return await this.session.fetchStreamingUrl(videoId);
  }

  public async fectchSearchContinuation(token:string):Promise<{ results: SearchResult[], continuationToken?: string }>{
    if(!this.haveSession){
      await this.getSession();
    }
    return await this.session.fetchSearchContinuation(token);
  }
  //when you query for the search you will also get the playlistId for each item if no Playlist id is provided it will return []
  public async fetchSimilarSongsOrPlaylist(videoid:string,playlistId?:string){

      if(!this.haveSession){
          await this.getSession();
      }
      return await this.session.getSimlarsongs(videoid,playlistId);
  }

}

