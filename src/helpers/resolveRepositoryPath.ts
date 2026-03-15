import { normaliseDirectoryPath } from "./normaliseDirectoryPath";
import { splitSegments } from "./splitSegments";

export const resolveRepositoryPath = (
  currentDirectory: string,
  targetPath: string,
) => {
  const trimmedTargetPath = targetPath.trim();
  const currentDirectoryPath = normaliseDirectoryPath(currentDirectory);

  if (!trimmedTargetPath) {
    return currentDirectoryPath;
  }

  const isAbsolutePath = trimmedTargetPath.startsWith("/");
  const currentSegments = isAbsolutePath
    ? []
    : splitSegments(currentDirectoryPath);

  for (const segment of splitSegments(trimmedTargetPath)) {
    if (segment === ".") {
      continue;
    }

    if (segment === "..") {
      currentSegments.pop();
      continue;
    }

    currentSegments.push(segment);
  }

  return currentSegments.join("/");
};
