import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export interface postMetaData {
  title: string;
  date: string;
  id: string;
}

export function getSortedPostsData(): postMetaData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { title: string; date: string }),
    };
  });
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export interface postId {
  params: { id: string };
}

export function getAllPostIds(): postId[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }, 
      locale: "ja"
    };
  });
}

export interface postData extends postMetaData {
  content: string;
}

export async function getPostData(id: string): Promise<postData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const matterResult = matter(fileContents);

  return {
    id,
    ...(matterResult.data as { title: string; date: string }),
    content: matterResult.content,
  };
}
