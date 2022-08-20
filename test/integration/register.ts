import * as config from "./config";
import * as discord from "../../src";

test("should get ping", async () => {
  const webhook = discord.webhook({ publicKey: config.publicKey });
  await new Promise((res, rej) => {
    webhook.register(discord.Interaction.Ping, res);
    setTimeout(rej, 1000 * 60);
  });
});
