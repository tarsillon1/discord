import * as discord from "../src";

const publicKey = process.env.PUBLIC_KEY as string;
const port = parseInt(process.env.PORT as string);
console.log(`config: port ${port}, public key ${publicKey}`);

const webhook = discord.webhook({ publicKey, port });
webhook.register(discord.Interaction.Ping, (event) => console.log("got event", event));
