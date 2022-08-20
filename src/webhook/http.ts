import type { WebhookCaller } from "./registry";

import fastify from "fastify";
import rawBodyPlugin from "fastify-raw-body";

import * as handlers from "./handlers";
import * as middleware from "./middleware";

export interface ListenConfig {
  publicKey: string;
  port: number;
  caller: WebhookCaller;
}

export const listen = async ({ caller, port, publicKey }: ListenConfig) => {
  const server = fastify();
  await server.register(rawBodyPlugin, {});

  const withVerifier = middleware.makeVerifier(publicKey);
  const handleInteraction = handlers.makeInteractionHandler(caller);
  server.post("/", withVerifier(handleInteraction));

  await server.listen({ port });
  return { close: server.close.bind(server) as () => Promise<void> };
};
