type GitHubContentResponse = {
  type?: "file" | "dir";
  content?: string;
  encoding?: "base64" | string;
};

const REPOSITORY_CONTENT_URL =
  "https://api.github.com/repos/nich1jb/nick-does-dev/contents";

export const getRepositoryFileContents = async (path: string) => {
  const normalizedPath = path.trim().replace(/^\.\//, "");

  if (!normalizedPath) {
    return "Usage: cat <file>";
  }

  const response = await fetch(
    `${REPOSITORY_CONTENT_URL}/${normalizedPath}?ref=main`,
  );

  if (response.status === 404) {
    return `cat: ${normalizedPath}: No such file`;
  }

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as GitHubContentResponse;

  if (payload.type === "dir") {
    return `cat: ${normalizedPath}: Is a directory`;
  }

  if (!payload.content) {
    return `cat: ${normalizedPath}: Unable to read file contents`;
  }

  if (payload.encoding !== "base64") {
    return `cat: ${normalizedPath}: Unsupported file encoding`;
  }

  const decodedContent = atob(payload.content.replace(/\n/g, ""));

  return decodedContent.split("\n");
};
