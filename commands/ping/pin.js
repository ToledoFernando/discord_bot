module.exports = {
  name: "ping",
  description: "Responde con un Pong",
  async execute(client, message, args, discord) {
    message.channel.send("!Pong");
  },
};
