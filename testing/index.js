import {Innertube} from 'onlynativetube'
const yt= new Innertube();
for(let i=0;i<=100;i++){
    setTimeout(()=>{
 yt.search("renuka panwar song").then(d=>{
    console.log(d)
 })
    },500)
}