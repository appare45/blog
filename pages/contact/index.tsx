import Head from "next/head";
import Script from "next/script";
import Layout from "../../components/layout";
import { Heading } from "../../components/util";
import { useLocale } from "../../hooks/useLocale";
import { usePageInfo } from "../../hooks/usePageInfo";

export default function Contact() {
  const locale = useLocale();
  const { siteTitle } = usePageInfo();
  return (
    <Layout pageTitle="Contact" noIndex>
      <Head>
        <title>Contact | {siteTitle}</title>
      </Head>
      <Heading level={2}>Contact</Heading>
      <form
        action="/api/contact"
        acceptCharset="utf-8"
        method="post"
        id="contact-form"
      >
        <div className="flex flex-col space-y-1 py-1">
          <label>
            {locale.t.message}
            <textarea
              name="text"
              id="text"
              cols={30}
              rows={10}
              required
              className="border p-2 w-full mb-1 "
            />
          </label>
          <label>
            {locale.t.email} {locale.t.option}
            <input
              type="email"
              id="email"
              name="email"
              className="border invalid:border-red-50 w-full p-1 font-mono"
            />
          </label>
        </div>
        <div className="flex space-x-3">
          <button
            className=" bg-blue-600 text-white px-3 leading-7 rounded hover:bg-blue-700 "
            type="submit"
          >
            {locale.t.send}
          </button>
          <button
            type="reset"
            className="rounded border px-3 leading-7 hover:bg-slate-50"
          >
            {locale.t.reset}
          </button>
        </div>
        <div
          className="cf-turnstile"
          data-sitekey="0x4AAAAAAACTKjRsGDfe8G9p"
          data-language={locale.locale}
        />
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" />
      </form>
    </Layout>
  );
}
