import { tweet } from "../lib/tweets";
import { Date } from "./date";
import { Link } from "./util";

export function Tweets({ data }: { data: tweet[] }) {
  return (
    <ul>
      {data.map((tweet) => (
        <li key={tweet.id} className="my-2">
          {tweet.text.replace(/https:\/\/.+/, " ")} <br />
          <small className="flex items-center text-gray-600">
            <Link
              href={`https://twitter.com/appare45/status/${tweet.id}`}
              new_tab
            >
              <Date dateString={tweet.created_at} />
            </Link>
            <Link
              href={`https://twitter.com/intent/like?tweet_id=${tweet.id}`}
              new_tab
            >
              <div className="flex items-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2 mr-1 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {tweet.public_metrics.like_count}
              </div>
            </Link>
          </small>
        </li>
      ))}
    </ul>
  );
}
