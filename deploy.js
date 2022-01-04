const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const NSFW_ENDPOINTS = ["ass", "assgif", "athighs", "bbw", "bdsm", "blow", "boobs", "feet", "furfuta", "furgif", "futa", "gifs", "hboobs", "hentai", "hfeet", "irlfemb", "jackopose", "kink", "milk", "pantsu", "sex", "slime", "thighs", "trap", "yuri"]
const OPT = new SlashCommandStringOption()
    .setName("category")
    .setRequired(true)
    .setDescription("Category");

for (const I of NSFW_ENDPOINTS) {
    OPT.addChoice(I, I)
}
const stopCMD = new SlashCommandBuilder()
    .setName("nsfw")
    .setDescription("Have some lewds")
    .addStringOption(opt => OPT)
commands = [stopCMD];

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(process.env.AppID),
            { body: commands },
        ).then(msf => {
            console.log(msf)
        })
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
// 