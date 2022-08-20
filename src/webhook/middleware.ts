import type { RouteHandler } from "fastify";

import * as nacl from "tweetnacl";

export const makeVerifier =
  (publicKey: string) =>
  (next: RouteHandler): RouteHandler =>
    function (req, res) {
      const signature = req.headers["X-Signature-Ed25519"] as string;
      const timestamp = req.headers["X-Signature-Timestamp"] as string;
      const body = req.rawBody;

      if (!body) {
        return res.status(400).send("body is required");
      }
      if (!timestamp) {
        return res.status(400).send("timestamp is required");
      }
      if (!signature) {
        return res.status(400).send("signature is required");
      }

      const isVerified = nacl.sign.detached.verify(
        Buffer.from(timestamp + body),
        Buffer.from(signature, "hex"),
        Buffer.from(publicKey, "hex")
      );

      if (!isVerified) {
        return res.status(401).send("invalid request signature");
      }
      return next.bind(this)(req, res);
    };
