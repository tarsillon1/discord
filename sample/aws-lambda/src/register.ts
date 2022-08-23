/**
 * Before running the bot we must first register it's application commands.
 * This script does exactly that.
 */
import * as discord from "../../../src";

const token = process.env.TOKEN as string;
const application_id = process.env.APPLICATION_ID as string;

if (!token) {
  console.error("must provide bot token using TOKEN env");
  process.exit(1);
}
if (!application_id) {
  console.error("must provide bot application id using APPLICATION_ID env");
  process.exit(1);
}

const command: discord.ApplicationCommand = {
  id: "echo",
  name: "echo",
  application_id,
  description: "Echo message back to user.",
  options: [
    {
      name: "message",
      description: "A message to echo back to user.",
      type: discord.ApplicationCommandOptionType.String,
    },
  ],
};

discord.registerApplicationCommand({ token, command });
