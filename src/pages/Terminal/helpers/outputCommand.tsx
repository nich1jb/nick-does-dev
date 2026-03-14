import AboutMe from "../../../components/AboutMe";
import Contact from "../../../components/Contact";
import Experience from "../../../components/Experience";
import Skills from "../../../components/Skills";
import VideoPlayer from "../../../components/VideoPlayer";
import { triggerSystemWipeEffect } from "./triggerSystemWipeEffect";

export const outputCommand = (
  cmd: string,
  command: string,
  setHistory: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  switch (cmd) {
    case "help":
      return [
        "Usage:",
        " help               Get help for commands",
        " whoami             Show information about me",
        " skills             Show my skills",
        " experience         Show my work experience",
        " contact            Show how to contact me",
        " clear              Clear the terminal",
        " roll               ???",
      ];
    case "pwd":
      return window.location.origin;
    case cmd.match(/^echo\s+(.+)$/)?.input:
      return command.slice(5);
    case "date":
      return new Date().toString();
    case "whoami":
      return <AboutMe />;
    case "skills":
      return <Skills />;
    case "experience":
      return <Experience />;
    case "contact":
      return <Contact />;
    case "clear":
      setHistory([]);
      return "";
    case "rm -rf /":
      triggerSystemWipeEffect();
      return "";
    case "roll":
      return (
        <VideoPlayer
          videoId="dQw4w9WgXcQ"
          title="Rick Astley - Never Gonna Give You Up"
        />
      );
    case "":
      return "";
    default:
      return `Command not found: ${command}`;
  }
};
