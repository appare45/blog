import Head from "next/head";
import React from "react";
import { usePageInfo } from "../hooks/usePageInfo";
import { Image } from "./media";
import { Heading, Link } from "./util";

interface layoutProps {
  pageTitle: string;
  isHome?: boolean;
  noIndex?: boolean;
}

export default function Layout(props: React.PropsWithChildren<layoutProps>) {
  const { name } = usePageInfo();
  return (
    <div className="max-w-3xl py-1 px-5 mt-6 mb-6 mx-auto">
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="og:title" content={props.pageTitle} />
        <meta
          property="og:image"
          content="https://appare45.com/images/profile.jpg"
        />

        <title>{props.pageTitle}</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@appare45" />
        <meta name="twitter:creator" content="@appare45" />
        {props.noIndex && <meta name="robots" content="noindex" />}
      </Head>
      <header className="flex items-baseline">
        {props.isHome ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              height={108}
              width={108}
              alt={name}
            />
            <Heading level={1} className="text-inherit mx-5">
              {name}
            </Heading>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                width={108}
                height={108}
                alt={name}
              />
            </Link>
            <Heading level={2}>
              <Link href="/" className="text-inherit mx-5">
                {name}
              </Link>
            </Heading>
          </>
        )}
      </header>
      {props.children}
      {!props.isHome && (
        <Link href="/" className="mt-3">
          ← Back to home
        </Link>
      )}
    </div>
  );
}
