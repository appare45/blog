import { Fetcher } from "swr";
import axios from "axios";

export interface repo {
  name: string;
  html_url: string;
  description: null | string;
  language: string;
  archived: string;
  id: string;
  fork: boolean;
  updated_at: string;
}

export const fetchGithubRepos: Fetcher<repo[]> = async (id: string) => {
  const url = `https://api.github.com/users/${id}/repos`;
  const res = await axios.get<repo[]>(url, {
    params: {
      sort: "updated",
      per_page: 10,
    },
  });
  return res.data;
};
