import { GetStaticProps } from "next";
import Head from "next/head";
import { getSortedPostsData, postMetaData } from "../lib/posts";
import Layout, { id, siteTitle } from "../components/layout";
import { Heading, Link } from "../components/util";
import { GitHubRepos } from "../components/githubRepos";
import { fetchGithubRepo, repo } from "../lib/github";
import { getTweets, tweet } from "../lib/tweets";
import { Tweets } from "../components/tweet";
import { postsData, PostsList } from "../components/postsList";
import { fetchZennFeed } from "../lib/zenn";

const twitterUserId = "1021707116573155329";
const zennUserId = "appare45";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  const githubRepos = await fetchGithubRepo(id);
  const tweets = await getTweets(twitterUserId);
  const zennArticles = await fetchZennFeed(zennUserId);
  return {
    props: {
      allPostsData,
      githubRepos,
      tweets,
      zennArticles,
    },
    revalidate: 100,
  };
};

export default function Home({
  allPostsData,
  githubRepos,
  tweets,
  zennArticles,
}: {
  allPostsData: postMetaData[];
  githubRepos: repo[];
  tweets: tweet[];
  zennArticles: postsData[];
}) {
  return (
    <Layout isHome pageTitle={siteTitle}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="my-3">
        <ul>
          <li>
            <Link href="https://twitter.com/appare45">Twitter</Link>
          </li>
          <li>
            <Link href="https://github.com/appare45">GitHub</Link>
          </li>
          <li>
            <Link href="contact">Contact</Link>
          </li>
        </ul>
      </section>
      <section>
        <Heading level={2}>Blog</Heading>
        <PostsList
          allPostsData={allPostsData.map((e) => ({
            url: `/posts/${e.id}`,
            title: e.title,
            date: e.date,
          }))}
        />
      </section>
      <section>
        <Heading level={2}>Tech Article</Heading>
        <PostsList allPostsData={zennArticles} />
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
