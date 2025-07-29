import axios from "axios";
import { urls ,apiKey,YoutubeClientContext,YoutubeAndroidClientContext} from "./constants";


export async function httpClient(endpoint:string, data:object){
 const url = `${urls.Baseurl}/${endpoint}?key=${apiKey}`

 
    const body= {
        context:endpoint==="player"?YoutubeAndroidClientContext:YoutubeClientContext,
        ...data
    };
    console.log(body);
    
    const res=await axios.post(url,body,{
        headers:{
            "Content-Type":"application/json",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36"
        },
        
        
    });
    
    return res.data;


}