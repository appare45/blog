import Head from "next/head";
import React from "react";
import { Image } from "./media";
import { Heading, Link } from "./util";

export const name = "appare";
export const siteTitle = "appare";

interface layoutProps {
  pageTitle: string;
  isHome?: boolean;
}

export default function Layout(props: React.PropsWithChildren<layoutProps>) {
  return (
    <div className="max-w-3xl px-0 py-1 mt-6 mb-6 mx-auto">
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
        <title>{props.pageTitle}</title>
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex items-center flex-col">
        {props.isHome ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className="rounded-full"
              height={144}
              width={144}
              alt={name}
            />
            <Heading level={1}>{name}</Heading>
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
              <Link href="/" className="text-inherit">
                {name}
              </Link>
            </Heading>
          </>
        )}
      </header>
      <main>{props.children}</main>
      {!props.isHome && (
        <Link href="/" className="mt-3">
          ← Back to home
        </Link>
      )}
    </div>
  );
}
