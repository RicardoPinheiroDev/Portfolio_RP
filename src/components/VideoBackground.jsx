import { useRef, useEffect } from 'react';

const VideoBackground = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    
    const handleCanPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Autoplay prevented:', error);
        });
      }
    };

    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="video-background"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      webkit-playsinline="true"
      x-webkit-airplay="deny"
      onError={(e) => console.error('Video error:', e)}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;
