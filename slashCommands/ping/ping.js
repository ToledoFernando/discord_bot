const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Devuelve Ping",
  run: async (client, interaction) => {
    let msg = new MessageEmbed()
      .setTitle(`Ping:  ${client.ws.ping}ms`)
      .setDescription(
        "El ping es la latencia de la conexion entre servidor y cliente"
      )
      .setColor("BLUE");
    await interaction.reply({ embeds: [msg] });
  },
};
