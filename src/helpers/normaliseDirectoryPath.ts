import { splitSegments } from "./splitSegments";

export const normaliseDirectoryPath = (path: string) => {
  const segments = splitSegments(path);

  return segments.join("/");
};
