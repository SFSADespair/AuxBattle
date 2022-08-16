const { Client } = require("discord.js")
const mongoose = require('mongoose');
const { Database } = require("../../Structures/config.json") //import the database link from the config.json file

//When the database is connected, the client will be ready
module.exports = {
    name: 'ready',
    once: true,
    /**
     * @param {Client} client
     */
    execute(client) {
        console.log("The client is now ready")
        client.user.setActivity("HENTAI WITH THE BOIS!", { type: "WATCHING" })

        //Connect to the database
        if (!Database) return
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The client is now connected to the database")
        }).catch((err) => {
            console.log(err)
        })
    }
}