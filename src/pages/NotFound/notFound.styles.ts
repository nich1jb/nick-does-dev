import styled from "styled-components";

export const NotFoundRoot = styled.main`
  position: fixed;
  inset: 0;
  z-index: 999999;
  box-sizing: border-box;
  padding: 8px;
  background: #fff;
  color: #000;
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  line-height: normal;
`;

export const Centered = styled.div`
  text-align: center;
`;

export const Title = styled.h1`
  all: unset;
  display: block;
  margin: 0.67em 0;
  text-align: center;
  font-family: inherit;
  font-size: 2em;
  font-weight: bold;
  line-height: normal;
  letter-spacing: normal;
  color: inherit;
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px inset;
  margin: 0.5em auto;
`;
