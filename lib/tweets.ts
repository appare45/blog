import axios from "axios";

export interface tweet {
  created_at: string;
  id: string;
  text: string;
  public_metrics: {
    like_count: number;
  };
}

export async function getTweets(userId: string) {
  const endPoint = `https://api.twitter.com/2/users/${userId}/tweets?tweet.fields=created_at,public_metrics&expansions=author_id&user.fields=created_at&max_results=10`;
  let res = null;
  try {
   res = await axios.get<{ data: tweet[] }>(endPoint, {
    headers: {
      authorization: `Bearer ${process.env.TWITTER_API_KEY}`,
    },
  });
  } catch (error) {
    return null;
  }

  return res.data.data.filter((tweet) => !tweet.text.includes("@"));
}
