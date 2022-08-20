import type { WebhookCaller } from "./registry";
import type { RouteHandler } from "fastify";

import snakeCase from "lodash.snakecase";
import camelCase from "lodash.camelcase";
import { Interaction, InteractionCallback } from "../types";

const mapKeysDeep = (obj: object, cb: (key: string) => string): object => {
  const mapped = {} as { [key: string]: unknown };
  Object.entries(obj).forEach(([k, v]) => {
    let value = v;
    if (typeof v === "object") {
      value = mapKeysDeep(v, cb);
    }
    const key = cb(k);
    mapped[key] = value;
  });
  return mapped;
};

export const makeInteractionHandler =
  (caller: WebhookCaller): RouteHandler =>
  (req, res) => {
    const body = req.body as { type: Interaction };
    const event = mapKeysDeep(body, camelCase);
    const response = caller.call(body.type, event);
    if (response) {
      const snakeResponse = mapKeysDeep(body, snakeCase);
      return res.status(200).send(snakeResponse);
    }
    return res.status(200).send({ type: InteractionCallback.Pong });
  };
