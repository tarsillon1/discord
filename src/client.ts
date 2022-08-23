import type { ApplicationCommand } from "./types";

import { fetchJSON } from "./fetch";

const defaultDiscordUrl = "https://discord.com/api/v10/";

const makeHeaders = (token: string) => ({ Authorization: `Bot ${token}` });

export interface BaseRequest {
  /**
   * The discord API URL to use.
   * Defaults to: https://discord.com/api/v10/
   */
  apiUrl?: string;

  /**
   * Bot authorization token.
   */
  token: string;
}

export interface RegisterApplicationCommandRequest extends BaseRequest {
  /**
   * Application command to register.
   */
  command: ApplicationCommand;
}

export const registerApplicationCommand = (req: RegisterApplicationCommandRequest) =>
  fetchJSON(`${req.apiUrl || defaultDiscordUrl}/applications/${req.command.application_id}/commands`, {
    method: "POST",
    headers: makeHeaders(req.token),
    body: req.command,
  });
