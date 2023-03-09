module.exports = async (client, discord, interaction) => {
  if (interaction.isCommand()) {
    const command = client.slash.get(interaction.commandName);
    command.run(client, interaction);
  }
};
