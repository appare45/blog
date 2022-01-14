import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { getAllPostIds, getPostData } from "../../lib/posts";
import type { postData } from "../../lib/posts";
import Layout from "../../components/layout";
import { Date } from "../../components/date";
import { Heading, Link } from "../../components/util";
import { Image } from "../../components/media";

export default function Post({ postData }: { postData: postData }) {
  return (
    <Layout pageTitle={postData.title}>
      <article>
        <section className="mb-5">
          <Heading level={1}>{postData.title}</Heading>
          <div className="text-gray-500">
            <Date dateString={postData.date} />
          </div>
        </section>
        <ReactMarkdown
          components={{
            h1({ children }) {
              return <Heading level={2}>{children}</Heading>;
            },
            h2({ children }) {
              return <Heading level={3}>{children}</Heading>;
            },
            img({ src, alt }) {
              if (src) {
                return (
                  <Image
                    src={src}
                    alt={alt}
                    width={1920}
                    height={1080}
                    objectFit="scale-down"
                    // placeholder="blur"
                  />
                );
              } else {
                return <p>Failed to load image.</p>;
              }
            },
            p({ children }) {
              return <p className="leading-6 my-2 mb-4">{children}</p>;
            },
            a({ children, href }) {
              if (href) {
                return <Link href={href}>{children}</Link>;
              } else {
                return <p>Error</p>;
              }
            },
            ul({ children }) {
              return <li className="list-disc">{children}</li>;
            },
          }}
        >
          {postData.content}
        </ReactMarkdown>
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
