const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: 32767 });
const { Token } = require('./config.json');
const fs = require('fs');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

client.commands = new Collection();

const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});
module.exports = client;

require('../Systems/GiveawaySys')(client);

['Events', 'Commands'].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
})

client.login(Token)

const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('BOT IS UP AND RUNNING')
})

app.listen(process.env.PORT || 3333, () => {
    console.log('BOT IS UP AND RUNNING')
})