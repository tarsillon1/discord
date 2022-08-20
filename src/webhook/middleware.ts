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
        const err = "body is required";
        console.error(err);
        return res.status(400).send(err);
      }
      if (!timestamp) {
        const err = "timestamp is required";
        console.error(err);
        return res.status(400).send(err);
      }
      if (!signature) {
        const err = "signature is required";
        console.error(err);
        return res.status(400).send(err);
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
