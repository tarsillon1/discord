import type { Interaction } from "../types";

export interface WebhookCaller {
  call(hookType: Interaction, event: any): any;
}

export interface WebhookRegistry extends WebhookCaller {
  register(hookType: Interaction, handler: (event: any) => any): any;
}

export const makeWebhookRegistry = (): WebhookRegistry => {
  const eventMap = new Map();
  const call = (type: any, event: any) => {
    const listener = eventMap.get(type);
    if (listener) listener(event);
  };
  return { register: eventMap.set.bind(eventMap), call };
};
