import React from 'react';
import { Innertube } from 'onlynativetube';

const VideoPlayer = () => {
    const [videoUrl, setVideoUrl] = React.useState('');

    React.useEffect(() => {
        const fetchVideo = async () => {
            try {
                const yt = new Innertube();
                const searchResult = await yt.search('cat video');
                if (searchResult.results.length > 0) {
                    const videoId = searchResult.results[0].id;
                    const playerResult = await yt.player(videoId);
                    const streamingUrl = playerResult.streamingData.formats[0].url;
                    setVideoUrl(streamingUrl);
                }
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };

        fetchVideo();
    }, []);

    return (
        <div>
            {videoUrl ? (
                <video controls src={videoUrl} width="600" />
            ) : (
                <p>Loading video...</p>
            )}
        </div>
    );
};

export default VideoPlayer;
