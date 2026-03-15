import styled from "styled-components";

export const TerminalWrapper = styled.div`
  background-color: #000;
  color: #00ff00;
  font-family: "Courier New", monospace;
  font-size: 14px;
  @media (max-width: 1024px) {
    font-size: 16px;
  }
  padding: 20px;
  min-height: 100vh;
  border: 1px solid #333;
  cursor: text;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

export const TerminalContent = styled.div`
  p {
    margin: 0;
    line-height: 1.4;
  }
`;

export const History = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommandLine = styled.div`
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const PromptText = styled.span`
  white-space: nowrap;
`;

export const TerminalInput = styled.span`
  background: transparent;
  font-family: "Courier New", monospace;
  line-height: 1.4;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  outline: none;
`;

export const TerminalLine = styled.div`
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
`;
