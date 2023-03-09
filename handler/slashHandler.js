const fs = require("fs");
let slash = [];

module.exports = (client, discord) => {
  console.log("----------------Slash Commands----------------");
  fs.readdirSync("./slashCommands/").forEach((dir) => {
    const slashFolder = fs
      .readdirSync(`./slashCommands/${dir}`)
      .filter((file) => file.endsWith(".js"));

    // console.log(slash);

    for (let file of slashFolder) {
      if (!file.endsWith(".js")) {
        return console.log("NO es compatible");
      }
      const cmd = require(`../slashCommands/${dir}/${file}`);

      if (cmd.name) {
        client.slash.set(cmd.name, cmd);
        slash.push(cmd);
        console.log(`Add Slash command /${cmd.name}`);
      }
    }
  });

  client.on("ready", async () => {
    await client.application.commands.set(slash);
    console.log(`Slash command add: ${slash.length}`);
  });

  console.log("----------------Slash Commands----------------");
};
