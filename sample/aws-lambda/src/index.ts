/**
 * This lambda handles echoing messages back to the user via application commands.
 */
import * as discord from "../../../src";

import type { APIGatewayProxyHandler } from "aws-lambda";

const publicKey = process.env.PUBLIC_KEY as string;

export const handler: APIGatewayProxyHandler = async (event) => {
  const extractedHeaders = discord.extractHeaders(event.headers);
  const verification = discord.verify({ publicKey, ...extractedHeaders, body: event.body });
  if (!verification.ok) {
    return { statusCode: verification.code, body: verification.reason };
  }

  const { type, data, member, user }: discord.Interaction = JSON.parse(event.body as string);
  let callback: discord.InteractionCallback = { type: discord.InteractionCallbackType.Pong };
  switch (type) {
    case discord.InteractionType.ApplicationCommand:
      const invokerMsg = ((data.options || [])[0] as discord.InteractionApplicationCommandDataOptionString)?.value;
      const invokerName = member?.nick || member?.user?.username || user?.username;
      callback = {
        type: discord.InteractionCallbackType.ChannelMessageWithSource,
        data: { content: `${invokerName} sent "${invokerMsg}"` },
      };
  }
  return { statusCode: 200, body: JSON.stringify(callback) };
};
