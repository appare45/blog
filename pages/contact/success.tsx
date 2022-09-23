import Head from "next/head";
import Layout from "../../components/layout";
import { Heading } from "../../components/util";

export default function Success() {
  return (
    <Layout pageTitle="Succeed">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Heading level={1}>お問い合わせ完了</Heading>
      <p>お問い合わせが完了しました</p>
    </Layout>
  );
}
