import axios from "axios";
import { urls ,apiKey,YoutubeClientContext} from "./constants";


export async function httpClient(endpoint:string, data:object){
 const url = `${urls.Baseurl}/${endpoint}?key=${apiKey}`
 console.log(YoutubeClientContext);
 
    const body= {
        context:YoutubeClientContext ,
        ...data
    };
    console.log(body);
    
    const res=await axios.post(url,body,{
        headers:{
            "Content-Type":"application/json",
            "User-Agent": "com.google.android.youtube/18.13.35 (Linux; U; Android 11)"
        },
        
    });
    return res.data;


}