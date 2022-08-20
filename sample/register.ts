import * as config from "./config";
import * as discord from "../src";

const webhook = discord.webhook({ publicKey: config.publicKey });
webhook.register(discord.Interaction.Ping, (event) => console.log("got event", event));
