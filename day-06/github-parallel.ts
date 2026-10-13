// 14.3

interface GitHubUser {
  login: string;
  id: number;
  name: string | null;
  public_repos: number;
}

function isGitHubUser(value: unknown): value is GitHubUser {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const user = value as Record<string, unknown>;

  return (
    typeof user.login === "string" &&
    typeof user.id === "number" &&
    (typeof user.name === "string" || user.name === null) &&
    typeof user.public_repos === "number"
  );
}

async function getUser(
  username: string
): Promise<GitHubUser> {
  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}`
  );

  if (!res.ok) {
    throw new Error(
      `${username}: GitHub API returned ${res.status}`
    );
  }

  const data: unknown = await res.json();

  if (!isGitHubUser(data)) {
    throw new Error(
      `${username}: invalid GitHub user response`
    );
  }

  return data;
}

async function main(): Promise<void> {
  const usernames = [
    "Moustafa-Elbaloty",
    "octocat",
    "this-user-does-not-exist-999999"
  ];

  const results = await Promise.all(
    usernames.map(async (username) => {
      try {
        return await getUser(username);
      } catch (error: unknown) {
        return {
          username,
          error:
            error instanceof Error
              ? error.message
              : String(error)
        };
      }
    })
  );

  for (const result of results) {
    if ("error" in result) {
      console.log("Error:", result.error);
      continue;
    }

    console.log(
      `${result.login} | ${result.name ?? "No name"} | repos: ${result.public_repos}`
    );
  }
}

main().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(String(error));
  }
});
