import { GetStaticProps } from "next";
import Head from "next/head";
import { getSortedPostsData, postMetaData } from "../lib/posts";
import { Date } from "../components/date";
import Layout, { id, name, siteTitle } from "../components/layout";
import { Heading, Link } from "../components/util";
import { GitHubRepos } from "../components/githubRepos";
import { fetchGithubRepo, repo } from "../lib/github";
import { getTweets, tweet } from "../lib/tweets";
import { Tweets } from "../components/tweet";

const twitterUserId = "1021707116573155329";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  const githubRepos = await fetchGithubRepo(id);
  const tweets = await getTweets(twitterUserId);
  return {
    props: {
      allPostsData,
      githubRepos,
      tweets,
    },
    revalidate: 100,
  };
};

export default function Home({
  allPostsData,
  githubRepos,
  tweets,
}: {
  allPostsData: postMetaData[];
  githubRepos: repo[];
  tweets: tweet[];
}) {
  return (
    <Layout isHome pageTitle={siteTitle}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="p-1">
        <p>(EK71K/高2) React/typescript/Firebase</p>
      </section>
      <section className="my-3">
        <ul>
          <li>
            <Link href="https://twitter.com/appare45">Twitter</Link>
          </li>
          <li>
            <Link href="https://github.com/appare45">GitHub</Link>
          </li>
        </ul>
      </section>
      <section>
        <Heading level={2}>Blog</Heading>
        <ul>
          {allPostsData.map(({ id, title, date }) => (
            <li key="id">
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className="text-gray-600">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <Heading level={2}>Repositories</Heading>
        <GitHubRepos data={githubRepos} />
        <Link href={"https://github.com/" + id} new_tab>
          more on github→
        </Link>
      </section>
      <section>
        <Heading level={2}>Tweets</Heading>
        <Tweets data={tweets} />
        <Link href={"https://twitter.com/" + id} new_tab>
          more on twitter→
        </Link>
      </section>
    </Layout>
  );
}
