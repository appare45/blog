import Head from "next/head";
import Script from "next/script";
import { useMemo, useState } from "react";
import Layout, { siteTitle } from "../../components/layout";
import { Heading, Link } from "../../components/util";

export default function Contact() {
  return (
    <Layout pageTitle="Contact">
      <Head>
        <title>Contact | {siteTitle}</title>
      </Head>
      <Heading level={2}>Contact</Heading>
      <p>ご連絡はこちらから</p>
      <form
        action="/api/contact"
        acceptCharset="utf-8"
        method="post"
        id="contact-form"
      >
        <div className="flex flex-col space-y-1 py-1">
          <label>
            内容
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
            メールアドレス（返信が必要な場合）
            <input
              type="email"
              id="email"
              name="email"
              className="border invalid:border-red-50 w-full p-1 font-mono"
            />
          </label>
          <div
            className="h-captcha"
            data-sitekey="4d274fdf-11f9-4d67-935b-3c82b7830437"
          />
        </div>
        <div className="flex space-x-3">
          <Script
            src="https://js.hcaptcha.com/1/api.js"
            strategy="lazyOnload"
          />
          <button
            className=" bg-blue-600 text-white px-3 leading-7 rounded hover:bg-blue-700 "
            type="submit"
          >
            送信
          </button>
          <button
            type="reset"
            className="rounded border px-3 leading-7 hover:bg-slate-50"
          >
            リセット
          </button>
        </div>
      </form>
      <p>個人情報を入力しないでください</p>
    </Layout>
  );
}
