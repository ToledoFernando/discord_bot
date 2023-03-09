const { MessageEmbed } = require("discord.js");

const prefix = "*";

module.exports = async (client, discord, mensaje) => {
  if (mensaje.author.bot) return;

  if (!mensaje.content.startsWith(prefix)) {
    return await mensaje.reply("Este no es un comando valido");
  }

  const msg = mensaje.content.slice(1).split(" ");

  const command = client.commands.get(msg[0]);
  const args = msg.slice[1];

  if (command) {
    console.log("Comando aceptado");
    return command.execute(client, mensaje, args, discord);
  }
  if (!command) {
    console.log("COmando no");
    return mensaje.channel.send("Este comando no existe");
  }
};
