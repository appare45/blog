import type { NextApiRequest, NextApiResponse } from "next";

const allowedHost =
  process.env.NODE_ENV == "development"
    ? ["localhost", "0.0.0.0"]
    : ["appare45.com", "blog-appare45.vercel.app"];

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // validate request
  if (
    allowedHost.includes(new URL(request.headers.referer ?? "").hostname) &&
    request.headers["content-type"] == "application/x-www-form-urlencoded" &&
    request.body["h-captcha-response"] &&
    request.body["g-recaptcha-response"]
  ) {
    console.info(request.body);
    response.redirect("/contact/success");
  } else {
    response.redirect("/contact/fail");
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
