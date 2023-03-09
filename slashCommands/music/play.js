// const ytdl = require("discord-ytdl-core");
const ytdl = require("ytdl-core-discord");
const ytS = require("yt-search");
const {
  createAudioPlayer,
  createAudioResource,
  AudioPlayer,
  joinVoiceChannel,
  StreamType,
  NoSubscriberBehavior,
} = require("@discordjs/voice");

const ffmpeg = require("ffmpeg-static");

const searchMusic = async (name) => {
  const result = await ytS(name);
  return result.videos.length > 0 ? result.videos[0] : null;
};

module.exports = {
  name: "play",
  description: "Unirse a un canal de voz",
  options: [
    {
      name: "music",
      description: "nombre de la cancion ",
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    await interaction.deferReply();
    const vs = interaction.member.voice.channel;
    let musica = interaction.options.getString("music");

    const resource = await searchMusic(musica);

    if (!resource) {
      return interaction.reply({
        content: "No se encontro una musica",
        ephemeral: true,
      });
    }

    console.log(resource);

    const stream = await ytdl(resource.url, {
      filter: "audioonly",
      opusEncoded: true,
      encoderArgs: ["-af", "bass=g=10,dynaudnorm=f=200"],
    });

    const conn = joinVoiceChannel({
      channelId: vs.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false,
    });

    const rsc = createAudioResource(stream, {
      inputType: "opus",
      quality: 18,
      duration: 120000,
    });

    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });

    conn.subscribe(player);

    player.play(rsc, stream, {
      type: "opus",
    });

    if (!vs) {
      return await interaction.editReply({
        content: "Debes estar en un canal de voz primero",
        ephemeral: true,
      });
    }

    return await interaction.editReply(`Reproduciendo ${resource.title}`);
  },
};
