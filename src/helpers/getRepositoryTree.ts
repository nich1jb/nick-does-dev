type GitHubTreeEntry = {
  path: string;
  type: "blob" | "tree";
};

type GitHubTreeResponse = {
  tree?: GitHubTreeEntry[];
  truncated?: boolean;
};

const REPOSITORY_TREE_URL =
  "https://api.github.com/repos/nich1jb/nick-does-dev/git/trees/main?recursive=1";

const getTopLevelEntry = ({ path, type }: GitHubTreeEntry) => {
  const [topLevelSegment] = path.split("/").filter(Boolean);

  if (!topLevelSegment) {
    return null;
  }

  const isDirectory = type === "tree" || path.includes("/");

  return isDirectory ? `${topLevelSegment}/` : topLevelSegment;
};

const isTopLevelEntry = (entry: string | null): entry is string =>
  entry !== null;

export const getRepositoryTree = async () => {
  const response = await fetch(REPOSITORY_TREE_URL);

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as GitHubTreeResponse;

  if (!payload.tree) {
    throw new Error("GitHub response did not include a repository tree.");
  }

  const lines = [
    ...[
      ...new Set(payload.tree.map(getTopLevelEntry).filter(isTopLevelEntry)),
    ].sort((left, right) => left.localeCompare(right)),
  ];

  if (payload.truncated) {
    lines.push("", "[output truncated by GitHub API]");
  }

  return lines;
};
