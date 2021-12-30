import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { getAllPostIds, getPostData } from "../../lib/posts";
import type { postData } from "../../lib/posts";
import Layout from "../components/layout";
import { Date } from "../components/date";
import { Heading } from "../components/util";

export default function Post({ postData }: { postData: postData }) {
  return (
    <Layout pageTitle={postData.title}>
      <article>
        <Heading level={1}>{postData.title}</Heading>
        <div className="text-gray-500">
          <Date dateString={postData.date} />
        </div>
        <ReactMarkdown>{postData.content}</ReactMarkdown>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params!.id as string);
  return {
    props: {
      postData,
    },
  };
};
