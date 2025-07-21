import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';
import '../Styles/AudioPlayer.css';

const AudioPlayer = () => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [hasUserConsented, setHasUserConsented] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
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
  const t = translations[language]?.audioPlayer || translations.pt.audioPlayer;

  // Auto-minimize on mobile when music starts playing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && isPlaying) {
        setIsMinimized(true);
      }
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isPlaying]);

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

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
              <h3>{t.welcomeTitle}</h3>
              <p>{t.welcomeMessage}<br />
                <span className="note-text">{t.welcomeNote}</span></p>
              <div className="welcome-buttons">
                <button 
                  className="consent-btn yes-btn"
                  onClick={() => handleUserConsent(true)}
                >
                  {t.yesButton}
                </button>
                <button 
                  className="consent-btn no-btn"
                  onClick={() => handleUserConsent(false)}
                >
                  {t.noButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {hasUserConsented && !isHidden && (
        <div 
          className={`audio-player ${isMinimized ? 'minimized' : ''}`}
          onClick={isMinimized ? toggleMinimized : undefined}
        >
          <audio 
            ref={audioRef} 
            src={currentSong.file} 
            preload="metadata"
          />
          
          {isMinimized ? (
            <div className="minimized-player">
              <div className="minimized-info">
                <div className="minimized-title">{currentSong.title}</div>
              </div>
              <div className="minimized-controls">
                <button 
                  className={`mini-play-btn ${isPlaying ? 'playing' : 'paused'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayPause();
                  }}
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                {window.innerWidth <= 768 && (
                  <button 
                    className="mini-hide-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleHidden();
                    }}
                    aria-label="Hide player"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
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
                  Prev
                </button>
                <button 
                  className={`play-pause-btn ${isPlaying ? 'playing' : 'paused'}`}
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button 
                  className="skip-btn"
                  onClick={skipToNext}
                  aria-label="Skip to next"
                >
                  Next
                </button>
                {window.innerWidth <= 768 && (
                  <button 
                    className="hide-btn"
                    onClick={toggleHidden}
                    aria-label="Hide player"
                  >
                    ✕
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Show button when player is hidden on mobile */}
      {hasUserConsented && isHidden && window.innerWidth <= 768 && (
        <button 
          className="show-player-btn"
          onClick={() => setIsHidden(false)}
          aria-label="Show music player"
        >
          Show
        </button>
      )}
    </>
  );
};

export default AudioPlayer;