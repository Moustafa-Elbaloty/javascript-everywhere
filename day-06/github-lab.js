"use strict";
// 14.1
Object.defineProperty(exports, "__esModule", { value: true });
function isGitHubUser(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const user = value;
    return (typeof user.login === "string" &&
        typeof user.id === "number" &&
        (typeof user.name === "string" || user.name === null) &&
        (typeof user.bio === "string" || user.bio === null) &&
        typeof user.public_repos === "number" &&
        typeof user.followers === "number");
}
async function main() {
    const url = "https://api.github.com/users/Moustafa-Elbaloty";
    const res = await fetch(url, {
        headers: {
            Accept: "application/vnd.github+json"
        }
    });
    console.log("status:", res.status);
    console.log("statusText:", res.statusText);
    console.log("content-type:", res.headers.get("content-type"));
    console.log("x-ratelimit-remaining:", res.headers.get("x-ratelimit-remaining"));
    // x-ratelimit-remaining = عدد الطلبات المتبقية قبل الوصول إلى rate limit.
    if (!res.ok) {
        throw new Error(`GitHub API request failed with status ${res.status}`);
    }
    const data = await res.json();
    if (!isGitHubUser(data)) {
        throw new Error("Invalid GitHub user response");
    }
    const name = data.name ?? "No name";
    const bio = data.bio ?? "No bio";
    console.log("login:", data.login);
    console.log("name:", name);
    console.log("bio:", bio);
    console.log("public repos:", data.public_repos);
    console.log("followers:", data.followers);
}
main().catch((error) => {
    if (error instanceof Error) {
        console.error(error.message);
    }
    else {
        console.error(String(error));
    }
});
