import VideoPlayer from '../../components/video-player';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../types/routes.ts';
import TimeControls from './time-controls';
import { useSelectedFilm } from '../../hooks/use-selected-film.ts';
import RequestSuspense from '../../components/request-suspense';

interface CrossBrowserDocument {
  exitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  webkitExitFullscreen?: () => void;
  msExitFullscreen?: () => void;
  fullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  webkitFullscreenElement?: Element | null;
  msFullscreenElement?: Element | null;
}

interface CrossBrowserElement extends HTMLDivElement {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
  mozRequestFullscreen?: () => Promise<void>;
}

export default function Player() {
  const playerRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<CrossBrowserElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const navigate = useNavigate();
  const { selectedFilm } = useSelectedFilm({});

  function handlePlay() {
    playerRef.current?.play();
    setIsPlaying(true);
  }

  function handlePause() {
    playerRef.current?.pause();
    setIsPlaying(false);
  }

  function enterFullScreen(): void {
    containerRef.current?.requestFullscreen?.();
    containerRef.current?.mozRequestFullscreen?.();
    containerRef.current?.webkitRequestFullscreen?.();
    containerRef.current?.msRequestFullscreen?.();
  }

  function exitFullScreen(): void {
    const crossBrowserDocument = document as unknown as CrossBrowserDocument;
    if (crossBrowserDocument.exitFullscreen) {
      crossBrowserDocument.exitFullscreen();
    } else if (crossBrowserDocument.mozCancelFullScreen) {
      crossBrowserDocument.mozCancelFullScreen();
    } else if (crossBrowserDocument.webkitExitFullscreen) {
      crossBrowserDocument.webkitExitFullscreen();
    } else if (crossBrowserDocument.msExitFullscreen) {
      crossBrowserDocument.msExitFullscreen();
    }
  }

  function isFullscreen(): Element | null | undefined {
    const crossBrowserDocument = document as unknown as CrossBrowserDocument;
    return crossBrowserDocument.fullscreenElement ||
      crossBrowserDocument.mozFullScreenElement ||
      crossBrowserDocument.webkitFullscreenElement ||
      crossBrowserDocument.msFullscreenElement;
  }

  function handleFullScreenToggle() {
    if (isFullscreen()) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
  }

  const handleTimeUpdate = useCallback(() => {
    setTime(Number(playerRef.current?.currentTime));
  }, []);

  return (
    <RequestSuspense>
      <div className="player" ref={containerRef}>
        {selectedFilm && (
          <>
            <VideoPlayer
              videoLink={selectedFilm.videoLink}
              posterImage={selectedFilm.posterImage}
              ref={playerRef}
              onTimeUpdate={handleTimeUpdate}
            />
            <button
              type="button"
              className="player__exit"
              onClick={() => navigate(AppRoutes.Film.replace(':id', selectedFilm.id))}
            >
              Exit
            </button>
            <div className="player__controls">
              {playerRef.current && <TimeControls time={time} duration={Number(playerRef.current?.duration)} />}
              <div className="player__controls-row">
                {isPlaying ? (
                  <button type="button" className="player__play" onClick={handlePause}>
                    <svg viewBox="0 0 14 21" width="14" height="21">
                      <use xlinkHref="#pause"></use>
                    </svg>
                    <span>Pause</span>
                  </button>
                ) : (
                  <button type="button" className="player__play" onClick={handlePlay}>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                )}
                <div className="player__name">{selectedFilm.name}</div>
                <button type="button" className="player__full-screen" onClick={handleFullScreenToggle}>
                  <svg viewBox="0 0 27 27" width="27" height="27">
                    <use xlinkHref="#full-screen"></use>
                  </svg>
                  <span>Full screen</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </RequestSuspense>
  );
}
