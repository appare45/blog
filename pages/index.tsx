import { GetStaticProps } from "next";
import Head from "next/head";
import { getSortedPostsData, postMetaData } from "../lib/posts";
import { Heading, Link } from "../components/util";
import { GitHubRepos } from "../components/githubRepos";
import { fetchGithubRepo, repo } from "../lib/github";
import { getTweets, tweet } from "../lib/tweets";
import { Tweets } from "../components/tweet";
import { postsData, PostsList } from "../components/postsList";
import { fetchZennFeed } from "../lib/zenn";
import { usePageInfo } from "../hooks/usePageInfo";
import Layout from "../components/layout";
import { useLocale } from "../hooks/useLocale";

const twitterUserId = "1021707116573155329";
const zennUserId = "appare45";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  const githubRepos = await fetchGithubRepo("appare45");
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
  const { siteTitle, id } = usePageInfo();
  const { locale } = useLocale();
  return (
    <Layout isHome pageTitle={siteTitle} noIndex={locale != "ja"}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main className="flex flex-col gap-5">
        <section>
          <ul className="flex gap-3">
            <li>
              <Link href="https://twitter.com/appare45">Twitter</Link>
            </li>
            <li>
              <Link href="https://github.com/appare45">GitHub</Link>
            </li>
            <li>
              <Link href="contact">Contact</Link>
            </li>
            {locale != "ja" ?? (
              <li>
                <Link href="https://www.linkedin.com/in/appare45/">
                  LinkedIn
                </Link>
              </li>
            )}
          </ul>
        </section>
        {locale == "ja" ? (
          <>
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
            {tweets && (
              <section>
                 <Heading level={2}>Tweets</Heading>
                <Tweets data={tweets} />
                <Link href={"https://twitter.com/" + id} new_tab>
                  more on twitter→
                </Link>
              </section>
            )}
          </>
        ) : (
          <>
            <section>
              <p>I am a softweare engineer</p>
            </section>
            <section>
              <Heading level={2}>Education</Heading>
              <ul className="flex flex-col gap-4">
                <li>
                  <div>2023-</div>
                  <div className="font-bold">
                    Undergraduate student majoring in computer science
                  </div>
                  <div className="italic">
                    <Link href={"https://www.coins.tsukuba.ac.jp/en/"}>
                      College of Information Science
                    </Link>
                    ,
                    <Link href={"https://www.tsukuba.ac.jp/en/"}>
                      University of Tsukuba
                    </Link>
                    , Japan
                  </div>
                </li>
                <li>
                  <div>2020-2023</div>
                  <div className="font-bold">Schooling</div>
                  <div className="italic">
                    <Link href={"https://ekh.jp/en/"}>
                      Eiko Gakuen High School
                    </Link>
                    , Private School, Japan
                  </div>
                </li>
              </ul>
            </section>
            <section>
              <Heading level={2}>Technical Skills</Heading>
              <Heading level={3}>Programming</Heading>
              <p>JavaScript, TypeScript, C, C++, Python</p>
              <Heading level={3}>Web</Heading>
              <p>React JS, NextJS, GatsbyJS, NodeJS, HTML, CSS,</p>
            </section>
          </>
        )}
        <section>
          <Heading level={2}>Repositories</Heading>
          <GitHubRepos data={githubRepos} />
          <Link href={"https://github.com/" + id} new_tab>
            more on github→
          </Link>
        </section>
      </main>
    </Layout>
  );
}
