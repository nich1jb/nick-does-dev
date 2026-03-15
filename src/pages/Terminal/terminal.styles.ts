import styled from "styled-components";

export const TerminalWrapper = styled.div`
  background-color: #000;
  color: #00ff00;
  font-family: "Courier New", monospace;
  font-size: 14px;
  padding: 20px;
  min-height: 100vh;
  border: 1px solid #333;
  cursor: text;
  box-sizing: border-box;
  position: relative;
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
export const TerminalInput = styled.input`
  background: transparent;
  border: none;
  color: #00ff00;
  font-family: "Courier New", monospace;
  font-size: 14px;
  outline: none;
  flex: 1;
  caret-color: #00ff00;
`;

export const TerminalLine = styled.div`
  white-space: pre-wrap;
`;
