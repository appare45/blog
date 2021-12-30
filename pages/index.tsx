import { GetStaticProps } from "next";
import Head from "next/head";
import { getSortedPostsData, postMetaData } from "../lib/posts";
import { Date } from "../components/date";
import Layout, { id, name, siteTitle } from "../components/layout";
import { Heading, Link } from "../components/util";
import { GitHubRepos } from "../components/githubRepos";
import { fetchGithubRepo, repo } from "../lib/github";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  const githubRepos = await fetchGithubRepo(id);
  return {
    props: {
      allPostsData,
      githubRepos,
    },
    revalidate: 100000,
  };
};

export default function Home({
  allPostsData,
  githubRepos,
}: {
  allPostsData: postMetaData[];
  githubRepos: repo[];
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
      </section>
    </Layout>
  );
}
