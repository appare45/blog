import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const hCaptchaVerifyUrl = "https://hcaptcha.com/siteverify";
const contactApiUrl = process.env.CONTACT_API_URL;
const lineApiToken = process.env.LINE_API_TOKEN;
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
  const requestFailed = () => {
    response.redirect("/contact/fail");
  };
  // validate request
  if (
    allowedHost.includes(new URL(request.headers.referer ?? "").hostname) &&
    request.headers["content-type"] == "application/x-www-form-urlencoded" &&
    request.body["h-captcha-response"] &&
    request.body["g-recaptcha-response"] &&
    request.body["text"]
  ) {
    try {
      const hCaptchaData = axios.post(
        hCaptchaVerifyUrl,
        `response=${request.body["h-captcha-response"]}&secret=${process.env.HCAPTCHA_API_KEY}`,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      if (
        (await hCaptchaData)?.status == 200 &&
        (await hCaptchaData).data["success"]
      ) {
        try {
          await sendDataToContactApi({
            text: request.body["text"],
            email: request.body["email"],
          });
          response.redirect("/contact/success");
        } catch {
          console.error("Unable to record contact request");
          requestFailed();
        }
      } else {
        requestFailed();
      }
    } catch {
      console.log("Unable to verify hCaptcha");
      requestFailed();
    }
  } else {
    requestFailed();
  }
}

async function sendDataToContactApi(contactData: contactData) {
  console.info(contactData);
  try {
    axios.post(
      "https://notify-api.line.me/api/notify",
      `message=
      ${contactData.text} by ${contactData.email}
    `,
      {
        headers: {
          Authorization: `Bearer ${lineApiToken}`,
        },
      }
    );
  } catch {
    console.log("Couldn't notify to LINE");
  }
  if (contactApiUrl) {
    return axios.post(
      contactApiUrl,
      `text=${encodeURIComponent(contactData.text)}&email=${contactData.email}`
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
