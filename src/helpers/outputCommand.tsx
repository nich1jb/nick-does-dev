import AboutMe from "../components/AboutMe";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import VideoPlayer from "../components/VideoPlayer";
import { getRepositoryFileContents } from "./getRepositoryFileContents";
import { getRepositoryTree } from "./getRepositoryTree";
import { resolveRepositoryPath } from "./resolveRepositoryPath";
import { toDisplayPath } from "./toDisplayPath";
import { triggerSystemWipeEffect } from "./triggerSystemWipeEffect";

type CommandOutput = string | string[] | React.ReactElement;

type CommandResult = {
  output: CommandOutput;
  nextDirectory?: string;
};

export const outputCommand = async (
  cmd: string,
  command: string,
  currentDirectory: string,
): Promise<CommandResult> => {
  const lsCommandMatch = cmd.match(/^ls(?:\s+(.+))?$/);
  const catCommandMatch = cmd.match(/^cat\s+(.+)$/);
  const cdCommandMatch = cmd.match(/^cd(?:\s+(.+))?$/);
  const lsMatch = command.trim().match(/^ls(?:\s+(.+))?$/i);
  const catMatch = command.trim().match(/^cat\s+(.+)$/i);
  const cdMatch = command.trim().match(/^cd(?:\s+(.+))?$/i);

  switch (cmd) {
    case "help":
      return {
        output: [
          "Usage:",
          " help               Get help for commands",
          " whoami             Show information about me",
          " skills             Show my skills",
          " experience         Show my work experience",
          " contact            Show how to contact me",
          " clear              Clear the terminal",
          " roll               ???",
        ],
      };
    case "pwd":
      return { output: toDisplayPath(currentDirectory) };
    case cmd.match(/^echo\s+(.+)$/)?.input:
      return { output: command.slice(5) };
    case "date":
      return { output: new Date().toString() };
    case "whoami":
      return { output: <AboutMe /> };
    case "skills":
      return { output: <Skills /> };
    case "experience":
      return { output: <Experience /> };
    case "contact":
      return { output: <Contact /> };
    case lsCommandMatch?.input: {
      const pathArgument = lsMatch?.[1]?.trim() ?? "";
      const targetPath = resolveRepositoryPath(currentDirectory, pathArgument);

      try {
        const listing = await getRepositoryTree(targetPath);

        return { output: listing };
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("No such file or directory")) {
            return {
              output: `ls: ${targetPath || "/"}: No such file or directory`,
            };
          }

          if (error.message.includes("Not a directory")) {
            return { output: `ls: ${targetPath || "/"}: Not a directory` };
          }
        }
        return {
          output: "Unable to load the repository tree right now.",
        };
      }
    }
    case catCommandMatch?.input: {
      const filePath = catMatch?.[1] ?? "";
      const resolvedPath = resolveRepositoryPath(currentDirectory, filePath);

      try {
        return { output: await getRepositoryFileContents(resolvedPath) };
      } catch {
        return {
          output: "Unable to load file contents right now.",
        };
      }
    }
    case cdCommandMatch?.input: {
      const targetArgument = cdMatch?.[1]?.trim() ?? "";
      const nextDirectory = targetArgument
        ? resolveRepositoryPath(currentDirectory, targetArgument)
        : "";

      try {
        await getRepositoryTree(nextDirectory);

        return { output: "", nextDirectory };
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes("No such file or directory")) {
            return {
              output: `cd: ${targetArgument || "/"}: No such directory`,
            };
          }

          if (error.message.includes("Not a directory")) {
            return { output: `cd: ${targetArgument || "/"}: Not a directory` };
          }
        }
        return {
          output: "Unable to change directory right now.",
        };
      }
    }
    case "clear":
      return { output: "" };
    case "rm -rf /":
      triggerSystemWipeEffect();
      return { output: "" };
    case "roll":
      return {
        output: (
          <VideoPlayer
            videoId="dQw4w9WgXcQ"
            title="Rick Astley - Never Gonna Give You Up"
          />
        ),
      };
    case "konami":
      return { output: "↑ ↑ ↓ ↓ ← → ← → B A" };
    case "":
      return { output: "" };
    default:
      return { output: `Command not found: ${command}` };
  }
};
