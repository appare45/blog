import Head from "next/head";
import Layout from "../../components/layout";
import { Heading } from "../../components/util";

export default function Success() {
  return (
    <Layout pageTitle="Failed">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Heading level={1}>お問い合わせ失敗</Heading>
      <p>エラーが発生しました。</p>
      <p>もう一度お試しください </p>
    </Layout>
  );
}
