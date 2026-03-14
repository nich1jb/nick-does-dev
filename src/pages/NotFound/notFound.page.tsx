import { Centered, Divider, NotFoundRoot, Title } from "./notFound.styles";

export const NotFoundPage = () => {
  return (
    <NotFoundRoot>
      <Title>404 Not Found</Title>
      <Divider />
      <Centered>nginx/1.18.0</Centered>
    </NotFoundRoot>
  );
};
