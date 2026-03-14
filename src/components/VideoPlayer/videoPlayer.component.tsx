import { RetroTV } from "./videoPlayer.styles";

type VideoPlayerProps = {
  videoId: string;
  title: string;
};

export const VideoPlayer = ({ videoId, title }: VideoPlayerProps) => (
  <RetroTV>
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        maxWidth: "100%",
        border: "1px solid #333",
        filter: "sepia(100%) saturate(300%) brightness(50%) hue-rotate(60deg)",
      }}
    ></iframe>
  </RetroTV>
);
