import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const siteVerifyUrl =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
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
    response.redirect(302, "/contact/fail");
  };
  // validate request
  if (
    allowedHost.includes(new URL(request.headers.referer ?? "").hostname) &&
    request.headers["content-type"] == "application/x-www-form-urlencoded" &&
    request.headers["CF-Connecting-IP"] &&
    request.body["cf-turnstile-response"] &&
    request.body["text"]
  ) {
    try {
      const verifyData = axios.post(
        siteVerifyUrl,
        `response=${request.body["cf-turnstile-response"]}&secret=${process.env.VERIFY_API_KEY}&remoteip=${request.headers["CF-Connecting-IP"]}`,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      if (
        (await verifyData)?.status == 200 &&
        (await verifyData).data["success"]
      ) {
        try {
          await sendDataToContactApi({
            text: request.body["text"],
            email: request.body["email"],
          });
          response.redirect(302, "/contact/success");
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
