export const splitSegments = (path: string) =>
  path
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);
