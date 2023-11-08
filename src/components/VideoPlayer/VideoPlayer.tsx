
type VideoPlayerProps = {
    videoLink: string;
    posterImage: string;
}

const VideoPlayer = ({videoLink, posterImage}: VideoPlayerProps) => (
  <video className={'player__video'} src={videoLink} poster={posterImage} autoPlay muted playsInline>
  </video>
);

export default VideoPlayer;

