import type { RouteHandler } from "fastify";

import * as nacl from "tweetnacl";

export const makeVerifier =
  (publicKey: string) =>
  (next: RouteHandler): RouteHandler =>
    function (req, res) {
      const signature = req.headers["x-signature-ed25519"] as string;
      const timestamp = req.headers["x-signature-timestamp"] as string;
      const body = req.rawBody;

      if (!body) {
        const err = "bad request: body is required";
        console.warn(err);
        return res.status(400).send(err);
      }
      if (!timestamp) {
        const err = "bad request: timestamp is required";
        console.warn(err);
        return res.status(400).send(err);
      }
      if (!signature) {
        const err = "bad request: signature is required";
        console.warn(err);
        return res.status(400).send(err);
      }

      const isVerified = nacl.sign.detached.verify(
        Buffer.from(timestamp + body),
        Buffer.from(signature, "hex"),
        Buffer.from(publicKey, "hex")
      );

      if (!isVerified) {
        const err = "forbidden: invalid request signature";
        console.warn(err);
        return res.status(401).send(err);
      }
      return next.bind(this)(req, res);
    };
