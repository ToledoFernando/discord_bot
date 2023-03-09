const fs = require("fs");

module.exports = (client, discord) => {
  console.log("----------------EVENTS----------------");
  fs.readdirSync("./events/").forEach((dir) => {
    const eventos = fs
      .readdirSync(`./events/${dir}`)
      .filter((file) => file.endsWith(".js"));
    for (let file of eventos) {
      if (!file.endsWith(".js")) return console.log("NO es compatible");
      const evt = require(`../events/${dir}/${file}`);
      if (evt.event && typeof evt.event !== "string") {
        continue;
      }
      evt.event = evt.event || file.replace(".js", "");
      client.on(evt.event, evt.bind(null, client, discord));
      console.log(`${file} cargado`);
    }
  });

  console.log("----------------EVENTS----------------");
};
