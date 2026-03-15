import { normaliseDirectoryPath } from "./normaliseDirectoryPath";

export const toDisplayPath = (path: string) => {
  const normalizedPath = normaliseDirectoryPath(path);

  return normalizedPath ? `/${normalizedPath}` : "/";
};
