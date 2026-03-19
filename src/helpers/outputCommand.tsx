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

type CommandResult = {
  output: string | string[] | React.ReactElement;
  nextDirectory?: string;
};

type CommandContext = {
  commandInput: string;
  currentDirectory: string;
};

type ExactCommandHandler = (
  context: CommandContext,
) => Promise<CommandResult> | CommandResult;

type ArgCommandHandler = (
  context: CommandContext,
  args: string,
) => Promise<CommandResult> | CommandResult;

const exactCommandHandlers: Record<string, ExactCommandHandler> = {
  help: () => ({
    output: [
      "Usage:",
      " help               Get help for commands",
      " whoami             Show information about me",
      " skills             Show my skills",
      " experience         Show my work experience",
      " contact            Show how to contact me",
      " clear              Clear the terminal",
      " exit               Close this window",
      " roll               ???",
    ],
  }),
  pwd: ({ currentDirectory }) => ({
    output: toDisplayPath(currentDirectory),
  }),
  date: () => ({
    output: new Date().toString(),
  }),
  whoami: () => ({
    output: <AboutMe />,
  }),
  skills: () => ({
    output: <Skills />,
  }),
  experience: () => ({
    output: <Experience />,
  }),
  contact: () => ({
    output: <Contact />,
  }),
  clear: () => ({
    output: "",
  }),
  exit: () => {
    window.close();
    return { output: "" };
  },
  "rm -rf /": () => {
    triggerSystemWipeEffect();

    return { output: "" };
  },
  roll: () => ({
    output: (
      <VideoPlayer
        videoId="dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up"
      />
    ),
  }),
  konami: () => ({
    output: "↑ ↑ ↓ ↓ ← → ← → B A",
  }),
  "": () => ({
    output: "",
  }),
};

const argCommandHandlers: Record<string, ArgCommandHandler> = {
  echo: ({ commandInput }) => ({
    output: commandInput.slice(5),
  }),
  ls: async ({ currentDirectory }, pathArgument) => {
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
  },
  cat: async ({ currentDirectory }, filePathArgument) => {
    if (!filePathArgument) {
      return { output: "Usage: cat <file>" };
    }

    const resolvedPath = resolveRepositoryPath(
      currentDirectory,
      filePathArgument,
    );

    try {
      return { output: await getRepositoryFileContents(resolvedPath) };
    } catch {
      return {
        output: "Unable to load file contents right now.",
      };
    }
  },
  cd: async ({ currentDirectory }, targetArgument) => {
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
  },
};

export const outputCommand = async (
  commandInput: string,
  currentDirectory: string,
): Promise<CommandResult> => {
  const commandContext: CommandContext = {
    commandInput,
    currentDirectory,
  };

  const trimmedCommandInput = commandInput.trim();

  const exactHandler = exactCommandHandlers[trimmedCommandInput.toLowerCase()];

  if (exactHandler) {
    return exactHandler(commandContext);
  }

  const [cmdName, ...rawArgs] = trimmedCommandInput.split(/\s+/);
  const args = rawArgs.join(" ");
  const argHandler = argCommandHandlers[cmdName.toLowerCase()];

  if (argHandler) {
    return argHandler(commandContext, args);
  }

  return { output: `Command not found: ${commandInput}` };
};
