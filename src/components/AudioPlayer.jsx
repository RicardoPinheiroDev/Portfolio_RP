import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations/translations'
import '../Styles/AudioPlayer.css'

const AudioPlayer = forwardRef(({ style, ...props }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showWelcomePopup, setShowWelcomePopup] = useState(true)
  const audioRef = useRef(null)
  const { language } = useLanguage()
  const t = translations[language]

  const tracks = [
    {
      src: '/music_background/Nostalgic Soundscapes S01E02 _ Forgotten _ Windows 95 Retro Ambient.mp3',
      title: 'Nostalgic Soundscapes - Forgotten'
    },
    {
      src: '/music_background/fy_resort _ Intelligent DnB _ Jungle Mix [rzRI7p_zfhg].mp3',
      title: 'fy_resort - Intelligent DnB Mix'
    }
  ]

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3 
    }
  }, [])

  useImperativeHandle(ref, () => ({
    play: async () => {
      if (audioRef.current && !isPlaying) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
          console.log('Audio started playing from welcome popup')
        } catch (error) {
          console.error('Error playing audio:', error)
        }
      }
    }
  }))

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.error('Error playing audio:', error)
        }
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTrackEnd = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length
    setCurrentTrackIndex(nextIndex)
    setIsPlaying(true)
  }

  const handleAudioLoad = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play()
    }
  }

  const handleWelcomeYes = async () => {
    console.log('AudioPlayer: Welcome Yes button clicked')
    if (audioRef.current && !isPlaying) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
        console.log('Audio started playing from welcome popup')
      } catch (error) {
        console.error('Error playing audio:', error)
      }
    }
    setTimeout(() => {
      setShowWelcomePopup(false)
    }, 100)
  }

  const handleWelcomeNo = () => {
    setShowWelcomePopup(false)
  }

  return (
    <>
    
      {showWelcomePopup && (
        <div className="welcome-popup-overlay">
          <div className="welcome-popup">
            <div className="welcome-popup-content">
              <h2 className="welcome-title">
                {t.audioPlayer.welcomeTitle}
              </h2>
              
              <p className="welcome-message">
                {t.audioPlayer.welcomeMessage}
              </p>
              
              <p className="welcome-note">
                {t.audioPlayer.welcomeNote}
              </p>
              
              <div className="welcome-buttons">
                <button 
                  className="welcome-btn yes-btn"
                  onClick={handleWelcomeYes}
                >
                  {t.audioPlayer.yesButton}
                </button>
                
                <button 
                  className="welcome-btn no-btn"
                  onClick={handleWelcomeNo}
                >
                  {t.audioPlayer.noButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div 
        className={`dynamic-island ${isExpanded ? 'expanded' : 'compact'}`}
        onClick={() => setIsExpanded(!isExpanded)}
        style={style}
      >
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex].src}
        onEnded={handleTrackEnd}
        onLoadedData={handleAudioLoad}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        loop={false}
      />
      
      {/* Compact view */}
      <div className="compact-view">
        <div className="music-indicator">
          <div className={`music-wave ${isPlaying ? 'playing' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <button 
          className="compact-control" 
          onClick={(e) => {
            e.stopPropagation()
            togglePlay()
          }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <PauseIcon className="compact-icon" />
          ) : (
            <PlayIcon className="compact-icon" />
          )}
        </button>
      </div>
      
      <div className="expanded-view">
        <div className="player-info">
          <div className="track-title">{tracks[currentTrackIndex].title}</div>
          <div className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        
        <div className="audio-controls">
          <button 
            className="control-btn play-btn" 
            onClick={(e) => {
              e.stopPropagation()
              togglePlay()
            }}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <PauseIcon className="control-icon" />
            ) : (
              <PlayIcon className="control-icon" />
            )}
          </button>
          
          <button 
            className="control-btn mute-btn" 
            onClick={(e) => {
              e.stopPropagation()
              toggleMute()
            }}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="control-icon" />
            ) : (
              <SpeakerWaveIcon className="control-icon" />
            )}
          </button>
        </div>
      </div>
      </div>
    </>
  )
})

export default AudioPlayer