import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";
import { RedisLevel } from "upstash-redis-level";

// Manage this flag in your CI/CD pipeline and make sure it is set to false in production
const isLocal: boolean = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const token: string =
  "GITHUB_PERSONAL_TOKEN"; // github personal token
const owner: string = "REPO_OWNER"; // repo owner
const repo: string = "REPO_NAME"; // repo name
const branch: string = "REPO_BRANCH";

if (!branch) {
  throw new Error(
    "No branch found. Make sure that you have set the GITHUB_BRANCH or process.env.VERCEL_GIT_COMMIT_REF environment variable.",
  );
}

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch,
        owner,
        repo,
        token,
      }),
      databaseAdapter: new RedisLevel<string, Record<string, any>>({
        redis: {
          url: "UPSTASH_URL",
          token: "UPSTACH_TOKEN",
        },
        debug: process.env.DEBUG === "true" || false,
      }),
      namespace: branch,
    });
