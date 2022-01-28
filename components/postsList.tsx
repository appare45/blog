import { Link } from "../components/util";
import { postMetaData } from "../lib/posts";
import { Date } from "../components/date";

export interface postsData {
  url: string;
  title: string;
  date: string;
}

export const PostsList = ({ allPostsData }: { allPostsData: postsData[] }) => {
  return (
    <ul>
      {allPostsData.map(({ url, title, date }) => (
        <li key="id">
          <Link href={url}>{title}</Link>
          <br />
          <small className="text-gray-600">
            <Date dateString={date} />
          </small>
        </li>
      ))}
    </ul>
  );
};
