const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
} = require("@discordjs/voice");
const wait = require("node:timers/promises").setTimeout;
const {
  REST,
  Routes,
  Client,
  Events,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonStyle,
  VoiceChannel,
  ButtonBuilder,
} = require("discord.js");
const config = require("./config.json");

const rest = new REST({ version: "10" }).setToken(config.token);
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

(async () => {
  await rest.put(Routes.applicationCommands(config.clientID), {
    body: config.comands,
  });
})();

client.on(Events.ClientReady, () => {
  console.log(`Bot activo!`);
});

//===============================================//

const { SlashCommandBuilder } = require("discord.js");
const path = require("node:path");

const command = new SlashCommandBuilder()
  .setName("saludar")
  .setDescription("Saluda a uno o varios usuarios")
  .addStringOption((option) =>
    option
      .setName("nombres")
      .setDescription("Los nombres de los usuarios a saludar")
      .setRequired(true)
  );

//===============================================//

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  switch (interaction.commandName) {
    case "hole":
      await interaction.reply(`Saludos @${interaction.user.username}`);
      await wait(2000);
      return await interaction.editReply("Era bair xd");

    case "kkk":
      await interaction.deferReply();
      await wait(4000);
      return await interaction.editReply(
        "Aqui esta mi [portafolio web](https://ftoledo.online)"
      );
    case "play":
      await interaction.deferReply();
      await wait(2000);
      await interaction.editReply("Aun no agregado xd");
      await wait(1000);
      await interaction.followUp("Disponible en siguiente vercion");
      return await interaction.followUp("xd?");

    case "test":
      await interaction.reply("Hola que haciendo?");
      await wait(2000);
      return await interaction.deleteReply();
    case "msg":
      await interaction.reply("OKOK");
      const message = await interaction.fetchReply();
      console.log(message);
      return;
    case "saludar":
      //   const nombres = interaction.options.getString("nombres");
      await interaction.reply(
        `¡Hola ${interaction.options._hoistedOptions[0].value}!`
      );
      return;

    case "button":
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("primary")
          .setLabel("Clickea xd?")
          .setStyle(ButtonStyle.Primary)
      );

      return await interaction.reply({
        content: "XD",
        components: [row],
      });

    case "unirse":
      const chanel = interaction.options.getString("canal");

      const voiceChannel = await client.channels.fetch(chanel);

      const musica = path.join(__dirname, "msc.mp3");

      const xd = joinVoiceChannel({
        channelId: chanel,
        guildId: voiceChannel.guildId,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
        },
      });
      const resource = createAudioResource(musica, {
        metadata: {
          title: "A good song!",
        },
      });

      player.play(resource);

      xd.subscribe(player);

      console.log(xd);

      //   setTimeout(() => {
      //     xd.destroy();
      //   }, 2000);
      //   const sub = xd.subscribe(musica);

      //   setTimeout(() => {
      //     sub.unsubscribe();
      //   }, 5000);
      return await interaction.reply("OK");

    default:
      break;
  }
});

client.login(config.token);
