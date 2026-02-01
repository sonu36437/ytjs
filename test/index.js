import { Innertube } from '../dist/index.js'
import fs from 'fs'
const yt = new Innertube();
// yt.search("ruchika jangid songs").then(d=>{
//     console.log(d);
//
// })



// yt.fetchSimilarSongsOrPlaylist( 'qfSrPyX5Svk' ,'RDVGiO8AJ9gE8').then(d=>{
//     console.log(d)
// })
yt.player('qfSrPyX5Svk').then(d => {
    console.log(d)
})





