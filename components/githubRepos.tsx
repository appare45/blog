import useSWR from "swr";
import { repo } from "../lib/github";
import { Date } from "./date";
import { id } from "./layout";
import { Link } from "./util";

export function GitHubRepos({ data }: { data: repo[] }) {
  return (
    <div>
      <ul>
        {data
          .filter((repo) => !repo.fork)
          .map((repo) => (
            <li key={repo.id} className="mb-1">
              <Link href={repo.html_url}>{repo.name}</Link>
              <br />
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <small>{repo.language}</small>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 ml-2 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <small>
                  <Date dateString={repo.updated_at} />
                </small>
              </div>
            </li>
          ))}
      </ul>
      <Link href={"https://github.com/" + id}>more on github→</Link>
    </div>
  );
}
