import type { RequestOptions, IncomingMessage } from "http";

import * as https from "https";

const fetch = async (url: string, opts: RequestOptions & { body?: string }): Promise<string> => {
  if (opts.body) {
    opts.headers = { ...opts.headers, "Content-Length": opts?.body?.length.toString() };
  }
  const response = await new Promise<IncomingMessage>((res) => {
    const request = https.request(url, opts, res);
    if (opts.body) {
      request.write(opts.body);
    }
    request.end();
  });

  let data = "";
  response.on("data", (chunk) => (data += chunk));
  await new Promise<void>((res) => response.on("end", res));

  if ((response.statusCode as number) > 299) {
    throw new Error(`request failed with status code ${response.statusCode}: ${data}`);
  }
  return data;
};

export const fetchJSON = async (url: string, opts: RequestOptions & { body?: object }) => {
  const data = await fetch(url, {
    ...opts,
    headers: { ...opts.headers, "Content-Type": "application/json" },
    body: opts.body && JSON.stringify(opts.body),
  });
  return JSON.parse(data);
};
