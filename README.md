# 🎥 InnerTube YouTube API Wrapper

A lightweight wrapper around YouTube's internal API that allows you to:

- 🔍 Search for YouTube videos
- 🔁 Fetch continuation tokens (for paginated search results)
- 🎵 Get direct streaming URLs for video playback

---

## 📦 Installation

Clone the repository or add the files to your project manually:

```bash
git clone https://github.com/sonu36347/ytjs

```


***usage***
```
import { Innertube } from 'onlynativetube';

const yt = new Innertube();
```

***search***
```
 yt.search("test").then(d=>{
   console.log(d.results);
  
})

```

***pageination***
```
yt.fectchSearchContinuation("add continutation token here"):<promise>
```
***source***
```
yt.player("videoId")<promise>



```
**note**

there is not proxies been used here youtube may blacklist if many request is made , use this on client side to avoid blacklisting 


