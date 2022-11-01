import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const hCaptchaVerifyUrl = "https://hcaptcha.com/siteverify";
const contactApiUrl = process.env.CONTACT_API_URL;
const allowedHost =
  process.env.NODE_ENV == "development"
    ? ["localhost", "0.0.0.0"]
    : ["appare45.com", "blog-appare45.vercel.app"];

interface contactData {
  text: string;
  email?: string;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  let isRequestSucceed = false;
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
      .then((hCaptchaData) => {
        if (hCaptchaData?.status == 200 && hCaptchaData.data["success"]) {
          sendDataToContactApi({
            text: request.body["text"],
            email: request.body["email"],
          }).then(() => {
            console.info("rec");
            isRequestSucceed = true;
          });
        }
      });
  }
  if (isRequestSucceed) response.redirect("/contact/success");
  else response.redirect("/contact/fail");
}

async function sendDataToContactApi(contactData: contactData) {
  console.info(contactData);
  if (contactApiUrl) {
    return axios.post(
      contactApiUrl,
      `text=${contactData.text}&email=${contactData.email}`
    );
  } else return null;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
