import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.info(request.body);
  console.info(request.headers.location);
  console.info(request.headers.host);
  console.table(request.headers);
  response.redirect("/contact/success");
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
