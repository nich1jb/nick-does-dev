import { useEffect, useRef, useState, isValidElement } from "react";
import ScanlinesOverlay from "../../components/ScanlinesOverlay";
import {
  History,
  TerminalContent,
  TerminalInput,
  TerminalLine,
  TerminalWrapper,
} from "./terminal.styles";
import { outputCommand } from "../../helpers/outputCommand";

export const TerminalPage = () => {
  const [history, setHistory] = useState<
    (string | string[] | React.ReactElement)[]
  >([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isAwaitingCommand, setIsAwaitingCommand] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAwaitingCommand && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAwaitingCommand]);

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isAwaitingCommand) {
      void executeCommand(currentInput);
      setCurrentInput("");
    }
  };

  const scrollToBottom = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const executeCommand = async (command: string) => {
    const cmd = command.trim().toLowerCase();
    const prompt = `user@${window.location.hostname}:~$ ${command}`;

    setHistory((previousHistory) => [...previousHistory, prompt]);

    setIsAwaitingCommand(true);

    try {
      const output = await outputCommand(cmd, command, setHistory);

      if (cmd === "clear") {
        return;
      }

      setHistory((previousHistory) => [...previousHistory, output]);
    } finally {
      setIsAwaitingCommand(false);
    }
  };

  const renderLineContent = (
    content: string | string[] | React.ReactElement,
  ) => {
    if (isValidElement(content)) return content;
    if (Array.isArray(content)) {
      return content.map((line, i) => (
        <TerminalLine key={i}>{line}</TerminalLine>
      ));
    }
    return <TerminalLine>{content}</TerminalLine>;
  };

  return (
    <TerminalWrapper onClick={() => inputRef.current?.focus()}>
      <ScanlinesOverlay />
      <TerminalContent>
        Type 'whoami' for some information about me. Additonally, type 'help'
        for a list of commands.
        <History>
          {history.map((line, index) => (
            <div key={index}>{renderLineContent(line)}</div>
          ))}
        </History>
        {!isAwaitingCommand && (
          <>
            <span>user@{window.location.hostname}:~$&nbsp;</span>
            <TerminalInput
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck="false"
            />
          </>
        )}
      </TerminalContent>
    </TerminalWrapper>
  );
};
