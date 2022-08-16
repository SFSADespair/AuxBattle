const { Client, CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
        name: 'music',
        description: 'Complete music system',
        options: [{
                name: 'play',
                description: 'Play a song',
                type: 'SUB_COMMAND',
                options: [{
                    name: 'query',
                    description: 'Provide a name or a url for the song.',
                    type: 'STRING',
                    required: true
                }]
            },
            {
                name: 'volume',
                description: 'Adjust the volume of the music player',
                type: 'SUB_COMMAND',
                options: [{
                    name: 'percent',
                    description: '10 = 10%',
                    type: 'NUMBER',
                    required: true
                }]
            },
            {
                name: 'settings',
                description: 'Configure',
                type: 'SUB_COMMAND',
                options: [{
                    name: 'options',
                    description: 'Select an option.',
                    type: 'STRING',
                    required: true,
                    choices: [{
                            name: 'queue',
                            value: 'queue'
                        },
                        {
                            name: 'skip',
                            value: 'skip'
                        },
                        {
                            name: 'pause',
                            value: 'pause'
                        },
                        {
                            name: 'resume',
                            value: 'resume'
                        },
                        {
                            name: 'stop',
                            value: 'stop'
                        }
                    ]
                }]
            }
        ],
        /**
         * 
         * @param {CommandInteraction} interaction 
         * @param {Client} client 
         */
        async execute(interaction, client) {
            const { options, member, guild, channel } = interaction
            const voiceChannel = member.voice.channel

            if (!voiceChannel)
                return interaction.reply({ content: 'You must be in a voice channel for me to play music bruh', ephemeral: true })

            if (guild.me.voice.channelId && voiceChannel.id !== guild.me.voice.channelId)
                return interaction.reply({ content: `I am playing music in <#${guild.me.voice.channelId}> fam, fuck off ye!`, ephemeral: true })

            try {
                switch (options.getSubcommand()) {
                    case 'play':
                        {
                            client.distube.playVoiceChannel(voiceChannel, options.getString('query'), { textChannel: channel, member: member })
                            return interaction.reply({ content: '🎵 Request recieved.' })
                        }
                    case 'volume':
                        {
                            const vol = options.getNumber('percent')
                            if (vol > 100 || vol < 1)
                                return interaction.reply({ content: 'You have to specify a number between 1 and 100 you FUCK' })

                            client.distube.setVolume(voiceChannel, vol)
                            return interaction.reply({ content: `🔘 Volume has been set to \`${vol}%\` ` })
                        }
                    case 'settings':
                        {
                            const queue = await client.distube.getQueue(voiceChannel)

                            if (!queue)
                                return interaction.reply({ content: '❌ There is no queue.' })

                            switch (options.getString('options')) {
                                case 'skip':
                                    {
                                        await queue.skip(voiceChannel)
                                        return interaction.reply({ content: '⏭️ Song skipped.' })
                                    }
                                case 'stop':
                                    {
                                        await queue.stop(voiceChannel)
                                        return interaction.reply({ content: '⏹ Music has been stopped by your nan' })
                                    }
                                case 'pause':
                                    {
                                        await queue.pause(voiceChannel)
                                        return interaction.reply({ content: '⏸️ Music has been paused by your nan' })
                                    }
                                case 'resume':
                                    {
                                        await queue.resume(voiceChannel)
                                        return interaction.reply({ content: '▶ Music resumed' })
                                    }
                                case 'queue':
                                    {
                                        return interaction.reply({
                                                    embeds: [new MessageEmbed()
                                                            .setColor('PURPLE')
                                                            .setDescription(`${queue.songs.map(
                                                            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}`
                                                            )}`) //queue command
                                        ]
                                    });
                                } //queue case
                                return;
                        } //options switch
                    } //settings case
            }
        } catch (e) {
            const errEmbed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`⛔ Error: ${e.message}`)
            return interaction.reply({ embed: errEmbed, ephemeral: true })
        }
    }
}