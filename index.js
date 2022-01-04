const Discord = require("discord.js");
require("dotenv").config()
const { LewdClient } = require("lewds.api");
const lewds = new LewdClient({ KEY: process.env.LEWDSAPI })
const client = new Discord.Client({
    allowedMentions: {
        parse: []
    },
    intents: ["GUILDS"]
});
client.on("ready", () => {
    client.user.setActivity(process.env.STATUS, { type: process.env.STATUSTYPE.toUpperCase() })
    console.log("I'M READY")
});
client.on("interactionCreate", (inter) => {
    if (inter.isCommand()) {
        if (inter.commandName == "nsfw") {
            const type = inter.options.getString("category");
            if (inter.inGuild() && !inter.channel.nsfw) return inter.reply("This channel is not NSFW... OnO");
            if (type) {
                lewds.nsfw(type).then(img => {
                    inter.reply({ embeds: [new Discord.MessageEmbed().setImage(img).setColor("LUMINOUS_VIVID_PINK").setTitle("Here is your " + type + " image! OwO").setURL(img)] })
                })
            }
        }
    }
})
process.on("uncaughtException", (err) => {
    console.log(err);
});
process.on("unhandledRejection", (err) => {
    console.log(err);
});
client.login(process.env.TOKEN)