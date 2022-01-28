import Parser from "rss-parser";
import { postsData } from "../components/postsList";

const parser = new Parser();

export const fetchZennFeed = async (id: string): Promise<postsData[]> => {
  const url = `https://zenn.dev/${id}/feed`;
  const feed = await parser.parseURL(url);
  if (!feed.items.length) return [];
  return feed.items.map((item) => ({
    url: item.link as string,
    date: new Date(item.pubDate as string).toISOString(),
    title: item.title as string,
  }));
};
