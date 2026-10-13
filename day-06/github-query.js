"use strict";
// 14.2
Object.defineProperty(exports, "__esModule", { value: true });
async function main() {
    const baseUrl = "https://api.github.com/users/Moustafa-Elbaloty/repos";
    const url = new URL(baseUrl);
    url.searchParams.set("sort", "updated");
    url.searchParams.set("per_page", "5");
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`GitHub API request failed with status ${res.status}`);
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
        throw new Error("Invalid repositories response");
    }
    for (const repo of data) {
        if (typeof repo !== "object" || repo === null) {
            continue;
        }
        const item = repo;
        const name = typeof item.name === "string"
            ? item.name
            : "Unknown";
        const language = typeof item.language === "string"
            ? item.language
            : "—";
        const stars = typeof item.stargazers_count === "number"
            ? item.stargazers_count
            : 0;
        console.log(name, "| language:", language, "| stars:", stars);
    }
    // Search with a space and "&".
    const searchUrl = new URL("https://api.github.com/search/repositories");
    searchUrl.searchParams.set("q", "javascript & typescript");
    console.log("Encoded search:", searchUrl.search);
    const manualUrl = "https://api.github.com/search/repositories?q=javascript & typescript";
    console.log("Manual URL:", manualUrl);
}
main().catch((error) => {
    if (error instanceof Error) {
        console.error(error.message);
    }
    else {
        console.error(String(error));
    }
});
