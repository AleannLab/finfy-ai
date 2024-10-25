import { NextApiRequest, NextApiResponse } from "next";
// import { getJson } from "serpapi";
import { env } from "../../../src/configOpenAI/env";
;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const { q } = req.body;
    // const response = await getJson({
    //   api_key: env.SERP_API_KEY,
    //   q,
    //   tbm: "nws",
    //   location: Intl.DateTimeFormat()
    //     .resolvedOptions()
    //     .timeZone.replace("/", ", "),
    // });
    res.status(200).json({
      news_results: "response.news_results",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Please try again.",
    });
  }
}
