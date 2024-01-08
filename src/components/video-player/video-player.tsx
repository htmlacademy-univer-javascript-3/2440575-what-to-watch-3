import { forwardRef, memo } from 'react';

export interface VideoPlayerProps {
  videoLink: string;
  posterImage: string;
  onTimeUpdate?: () => void;
  muted?: boolean;
  autoPlay?: boolean;
}

const Player = forwardRef<HTMLVideoElement, VideoPlayerProps>((
  {
    videoLink,
    posterImage,
    onTimeUpdate,
    muted = false,
    autoPlay = false,
  },
  ref
) => (
  <video
    ref={ref}
    className="player__video"
    poster={posterImage}
    onTimeUpdate={onTimeUpdate}
    muted={muted}
    autoPlay={autoPlay}
    data-testid="video-player"
  >
    <source src={videoLink} />
  </video>
));

Player.displayName = 'VideoPlayer';

export const VideoPlayer = memo(Player);
