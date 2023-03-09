const fs = require("fs");

module.exports = (client, discord) => {
  console.log("----------------COMMANDS----------------");
  fs.readdirSync("./commands/").forEach((dir) => {
    const commands = fs
      .readdirSync(`./commands/${dir}`)
      .filter((file) => file.endsWith(".js"));

    for (let file of commands) {
      if (!file.endsWith(".js")) return console.log("NO es compatible");
      const cmd = require(`../commands/${dir}/${file}`);
      if (cmd.name) {
        client.commands.set(cmd.name, cmd);
        console.log(`Comando /${cmd.name} cargado`);
      } else {
        console.log(
          `No se encontro comando para agregar en ../commands/${dir}/${file}`
        );
      }
    }
  });

  console.log("----------------COMMANDS----------------");
};
