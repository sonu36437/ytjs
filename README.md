# OnlyNativeTube - YouTube InnerTube API Wrapper for Node.js & React Native

**OnlyNativeTube** is a lightweight YouTube API wrapper built for **Node.js** and **React Native**. It lets you search videos, fetch continuation tokens, and retrieve direct streaming URLs using YouTube's **InnerTube API**.
📦 [View on NPM](https://www.npmjs.com/package/onlynativetube)  
💻 [GitHub Repository](https://github.com/sonu36437/ytjs)

A lightweight wrapper around YouTube's internal API that allows you to:

- Search for YouTube videos
- Fetch continuation tokens (for paginated search results)
- Get direct streaming URLs for video playback
- No Api key is needed

---
<hr>

## 📦 Installation

Clone the repository or add the files to your project manually:

```bash
git clone https://github.com/sonu36347/ytjs

```
**or**
```
npm install onlynativetube@latest
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

***pagination***
```
yt.fectchSearchContinuation("add continutation token here"):<promise>
```
***Source***
````

yt.player("videoId")<promise>




````
**Note:**
All the previous versions are not working.




