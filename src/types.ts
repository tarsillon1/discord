export enum Interaction {
  Ping = 1,
  ApplicationCommand = 2,
  MessageComponent = 3,
  ApplicationCommandAutocomplete = 4,
  ModalSubmit = 5,
}

export enum InteractionCallback {
  Pong = 1,
  ChannelMessageWithSource = 4,
  DeferredChannelMessageWithSource = 5,
  DeferredUpdateMessage = 6,
  UpdateMessage = 7,
  ApplicationCommandAutocompleteResult = 8,
  Modal = 9,
}

export interface InteractionEvent {
  id: string;
  applicationId: string;
  token: string;
  version: string;
}

export interface WebhookClientConfig {
  /**
   * The port for the Webhook HTTP server. Defaults to 8080.
   */
  port?: number;

  /**
   * The public key of the discord application.
   */
  publicKey: string;
}

export type PingHook = (ev: InteractionEvent) => void;
export type ModalSubmitHook = (ev: InteractionEvent) => void;
export type MessageComponentHook = (ev: InteractionEvent) => void;
export type ApplicationCommandHook = (ev: InteractionEvent) => void;
export type ApplicationCommandAutocompleteHook = (ev: InteractionEvent) => void;

export interface WebhookClient {
  register(hookType: Interaction.Ping, handler: PingHook): void;
  register(hookType: Interaction.ModalSubmit, handler: ModalSubmitHook): void;
  register(hookType: Interaction.MessageComponent, handler: MessageComponentHook): void;
  register(hookType: Interaction.ApplicationCommand, handler: ApplicationCommandHook): void;
  register(hookType: Interaction.ApplicationCommandAutocomplete, handler: ApplicationCommandAutocompleteHook): void;

  /**
   * Close the webhook HTTP server to stop receiving events from discord API.
   */
  close(): Promise<void>;
}
