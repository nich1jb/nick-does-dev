import styled from "styled-components";

export const SectionHeader = styled.div`
  padding-top: 1em;
`;

export const ContactList = styled.div`
  line-height: 1.4;
  padding-left: 2ch;
  display: flex;
  flex-direction: column;
`;

export const ContactLink = styled.a`
  color: inherit;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    opacity: 0.75;
  }
`;
