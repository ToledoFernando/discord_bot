require("./extras/clear");
const config = require("./config.json");
const discord = require("discord.js");
const client = new discord.Client({
  intents: 32767,
  partials: ["USERS", "GUILD_MEMBERS"],
});

client.commands = new discord.Collection();
client.slash = new discord.Collection();

["commandHandler", "eventHandler", "slashHandler"].forEach((file) => {
  require(`./handler/${file}`)(client, discord);
});

client.login(config.token);
