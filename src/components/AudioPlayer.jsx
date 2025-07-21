import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';
import '../Styles/AudioPlayer.css';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [hasUserConsented, setHasUserConsented] = useState(false);
  const audioRef = useRef(null);

  const playlist = [
    {
      file: '/src/music_background/Nostalgic Soundscapes S01E02 _ Forgotten _ Windows 95 Retro Ambient.mp3',
      title: 'Nostalgic Soundscapes - Forgotten'
    },
    {
      file: '/src/music_background/fy_resort _ Intelligent DnB _ Jungle Mix [rzRI7p_zfhg].mp3',
      title: 'fy_resort - Intelligent DnB'
    }
  ];

  const currentSong = playlist[currentTrack];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    const handleEnded = () => {
      const nextTrack = (currentTrack + 1) % playlist.length;
      setCurrentTrack(nextTrack);
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  const handleUserConsent = async (consent) => {
    setHasUserConsented(true);
    setShowWelcomeModal(false);
    
    if (consent) {
      // Small delay to ensure audio element is ready
      setTimeout(async () => {
        const audio = audioRef.current;
        if (audio) {
          try {
            audio.volume = 0.7;
            await audio.play();
            setIsPlaying(true);
          } catch (error) {
            console.log('Auto-play failed:', error);
            setIsPlaying(false);
          }
        }
      }, 100);
    }
  };

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Play failed:', error);
        setIsPlaying(false);
      }
    }
  };

  const skipToNext = () => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
  };

  const skipToPrevious = () => {
    const previousTrack = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
    setCurrentTrack(previousTrack);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {showWelcomeModal && (
        <div className="welcome-modal-overlay">
          <div className="welcome-modal"> 
            <div className="welcome-content">
              <h3>Welcome to my Portfolio!</h3>
              <p>Would you like to enjoy some background music while exploring?<br />
                <span className="note-text">Note: Reloading the page will trigger this pop-up again</span></p>
              <div className="welcome-buttons">
                <button 
                  className="consent-btn yes-btn"
                  onClick={() => handleUserConsent(true)}
                >
                  Yes, play music
                </button>
                <button 
                  className="consent-btn no-btn"
                  onClick={() => handleUserConsent(false)}
                >
                  No, thanks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {hasUserConsented && (
        <div className="audio-player">
          <audio 
            ref={audioRef} 
            src={currentSong.file} 
            preload="metadata"
          />
          
          <div className="player-info">
            <div className="music-title">{currentSong.title}</div>
            <div className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="player-controls">
            <button 
              className="skip-btn"
              onClick={skipToPrevious}
              aria-label="Skip to previous"
            >
              <BackwardIcon style={{ width: '16px', height: '16px' }} />
            </button>
            <button 
              className={`play-pause-btn ${isPlaying ? 'playing' : 'paused'}`}
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <PauseIcon style={{ width: '16px', height: '16px' }} />
              ) : (
                <PlayIcon style={{ width: '16px', height: '16px' }} />
              )}
            </button>
            <button 
              className="skip-btn"
              onClick={skipToNext}
              aria-label="Skip to next"
            >
              <ForwardIcon style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AudioPlayer;