import { GetStaticProps } from "next";
import Head from "next/head";
import { getSortedPostsData, postMetaData } from "../lib/posts";
import { Date } from "./components/date";
import Layout, { siteTitle } from "./components/layout";
import { Link } from "./components/util";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default function Home({
  allPostsData,
}: {
  allPostsData: postMetaData[];
}) {
  return (
    <Layout isHome pageTitle={siteTitle}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="p-1">
        <p>(EK71K/高2) React/typescript/Firebase</p>
      </section>
      <section>
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
    </Layout>
  );
}
