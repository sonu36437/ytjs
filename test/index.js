import {Innertube }from 'onlynativetube'
import fs from 'fs'
const yt= new Innertube();
yt.search("renuka panwar").then(d=>{
    console.log(d);
    
})
yt.search("sad song").then(d=>{
    console.log(d);
    
})



