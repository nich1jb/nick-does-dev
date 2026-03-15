import { useEffect, useRef, useState, isValidElement } from "react";
import ScanlinesOverlay from "../../components/ScanlinesOverlay";
import {
  CommandLine,
  History,
  PromptText,
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
  const inputRef = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const promptLabel = `user@${window.location.hostname}:~$${"\u00A0"}`; // non-breaking space

  useEffect(() => {
    if (!isAwaitingCommand && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAwaitingCommand]);

  useEffect(() => {
    scrollToBottom();
  }, [history, isAwaitingCommand]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter" && !isAwaitingCommand) {
      e.preventDefault();
      executeCommand(currentInput);
      if (inputRef.current) {
        inputRef.current.textContent = "";
      }
      setCurrentInput("");
    }
  };

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    setCurrentInput(e.currentTarget.textContent ?? "");
  };

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  };

  const executeCommand = async (command: string) => {
    const cmd = command.trim().toLowerCase();
    const prompt = `${promptLabel}${command}`;

    setHistory((previousHistory) => [...previousHistory, prompt]);
    setIsAwaitingCommand(true);

    try {
      const output = await outputCommand(cmd, command);

      if (cmd === "clear") {
        setHistory([]);
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
          <CommandLine>
            <PromptText>{promptLabel}</PromptText>
            <TerminalInput
              ref={inputRef}
              contentEditable
              suppressContentEditableWarning
              role="textbox"
              aria-label="Terminal command input"
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              spellCheck={false}
            />
          </CommandLine>
        )}
        <div ref={bottomRef} />
      </TerminalContent>
    </TerminalWrapper>
  );
};
