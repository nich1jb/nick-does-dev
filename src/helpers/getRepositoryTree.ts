type GitHubContentEntry = {
  type?: "file" | "dir";
  name?: string;
};

type GitHubContentsResponse = GitHubContentEntry | GitHubContentEntry[];

const REPOSITORY_CONTENT_URL =
  "https://api.github.com/repos/nich1jb/nick-does-dev/contents";

export const getRepositoryTree = async (path = "") => {
  const normalizedPath = path.trim().replace(/^\.\//, "").replace(/^\//, "");
  const targetPath = normalizedPath ? `/${normalizedPath}` : "";
  const response = await fetch(
    `${REPOSITORY_CONTENT_URL}${targetPath}?ref=main`,
  );

  if (response.status === 404) {
    const displayPath = normalizedPath || "/";
    throw new Error(`${displayPath}: No such file or directory`);
  }

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as GitHubContentsResponse;

  if (!Array.isArray(payload)) {
    const displayPath = normalizedPath || "/";
    throw new Error(`${displayPath}: Not a directory`);
  }

  return payload
    .map((entry) => {
      if (entry.name) {
        return entry.type === "dir" ? `${entry.name}/` : entry.name;
      }

      return null;
    })
    .filter((entry): entry is string => entry !== null)
    .sort((left, right) => left.localeCompare(right));
};
