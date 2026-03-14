import { useEffect, useRef, useState, isValidElement } from "react";
import ScanlinesOverlay from "../../components/ScanlinesOverlay";
import {
  History,
  TerminalContent,
  TerminalInput,
  TerminalLine,
  TerminalWrapper,
} from "./terminal.styles";
import { outputCommand } from "./helpers/outputCommand";

export const TerminalPage = () => {
  const [history, setHistory] = useState<
    (string | string[] | React.ReactElement)[]
  >([]);
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
      setCurrentInput("");
    }
  };

  const scrollToBottom = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const executeCommand = (command: string) => {
    const newHistory = [...history];
    newHistory.push(`user@${window.location.hostname}:~$ ${command}`);

    const cmd = command.trim().toLowerCase();

    const output = outputCommand(cmd, command, setHistory);

    if (cmd === "clear") {
      return;
    }

    if (output) {
      newHistory.push(output);
    }

    setHistory(newHistory);
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
      </TerminalContent>
    </TerminalWrapper>
  );
};
