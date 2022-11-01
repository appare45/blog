import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const hCaptchaVerifyUrl = "https://hcaptcha.com/siteverify";

const allowedHost =
  process.env.NODE_ENV == "development"
    ? ["localhost", "0.0.0.0"]
    : ["appare45.com", "blog-appare45.vercel.app"];

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // validate request
  if (
    allowedHost.includes(new URL(request.headers.referer ?? "").hostname) &&
    request.headers["content-type"] == "application/x-www-form-urlencoded" &&
    request.body["h-captcha-response"] &&
    request.body["g-recaptcha-response"] &&
    request.body["text"]
  ) {
    axios
      .post(
        hCaptchaVerifyUrl,
        `response=${request.body["h-captcha-response"]}&secret=${process.env.HCAPTCHA_API_KEY}`,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .catch((e) => {
        response.redirect("/contact/fail");
      })
      .then((hCaptchaData) => {
        if (hCaptchaData?.status == 200 && hCaptchaData.data["success"])
          response.redirect("/contact/success");
        else response.redirect("/contact/fail");
      });
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
