import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { FaPlay, FaPause } from "react-icons/fa";
import { SlSizeFullscreen } from "react-icons/sl";

const VideoPlayer = ({ video, onVideoSelect }) => {
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const playerRef = useRef(null);

  console.log(video);
  // console.log(onVideoSelect);

  const handleProgress = (state) => {
    setPlayed(state.played);
    setCurrentTime(state.played * state.loadedSeconds);
  };

  const handleSeek = (seekTime) => {
    const player = playerRef.current;
    if (player) {
      player.seekTo(seekTime);
      setPlayed(seekTime);
    }
  };

  const playPauseVideo = () => {
    const player = playerRef.current;
    if (player) {
      player.getInternalPlayer().paused
        ? player.getInternalPlayer().play()
        : player.getInternalPlayer().pause();
    }
  };

  const handleFullScreen = () => {
    const player = playerRef.current;
    if (player) {
      if (!isFullScreen) {
        player.getInternalPlayer().requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(playerRef.current.getCurrentTime());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [played]);

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", fullscreenChangeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
    };
  }, []);

  return (
    <Container>
      <div className={`video-player ${isFullScreen ? "fullscreen" : ""}`}>
        <ReactPlayer
          ref={playerRef}
          url={video?.video_url}
          controls={false}
          width="100%"
          height="auto"
          onProgress={handleProgress}
          onDuration={(duration) => setDuration(duration)}
          onClick={playPauseVideo}
        />
        <div className="video-info">
          <h2>{video?.title}</h2>
          <div className="custom-controls d-flex align-items-center">
            <button className="btnplay" onClick={playPauseVideo}>
              {playerRef.current?.getInternalPlayer()?.paused ? (
                <FaPlay />
              ) : (
                <FaPause />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={played}
              style={{ width: "100%" }}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
            />
            <p>
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
            <button className="fullscreen-btn" onClick={handleFullScreen}>
              {isFullScreen ? "Exit Fullscreen" : <SlSizeFullscreen />}
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const Container = styled.div`
  .video-player {
    position: relative;
  }

  .fullscreen {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }

  .video-info {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
    color: #fff;
  }

  .btnplay,
  .fullscreen-btn {
    /* background-color: #fff;
    color: #000; */
    padding: 0.5rem;
    background-color: none !important;
    margin-right: 10px;
    height: fit-content;
    width: auto !important;
    cursor: pointer;
  }

  /* .btnplay:hover,
  .fullscreen-btn:hover {
    background-color: #e1e1e1;
  } */
`;

export default VideoPlayer;
