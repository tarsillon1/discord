import type { WebhookClient, WebhookClientConfig } from "../types";

import * as http from "./http";
import { makeWebhookRegistry } from "./registry";

/**
 * Create a client for receiving interaction webhooks from Discord.
 * @param config the configuration for the webhook client.
 * @returns a new webhook client.
 */
export const webhook = (config: WebhookClientConfig): WebhookClient => {
  const registry = makeWebhookRegistry();
  const httpPromise = http.listen({
    port: config.port || 8080,
    host: config.host || "0.0.0.0",
    publicKey: config.publicKey,
    caller: registry,
  });
  const close = async () => {
    const { close } = await httpPromise;
    return close();
  };
  return { ...registry, close };
};
