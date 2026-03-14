import styled from "styled-components";

export const ScanlinesOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 4px,
    rgba(0, 255, 0, 0.05) 4px,
    rgba(0, 255, 0, 0.05) 6px
  );
  animation:
    scanlines 0.5s linear infinite,
    jitter 0.1s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: 2;

  @keyframes scanlines {
    0% {
      background-position:
        0 0,
        0 0;
    }
    100% {
      background-position:
        0 100%,
        0 150%;
    }
  }

  @keyframes jitter {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(10px);
    }
  }
`;
