const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const G = require('glob');
const ms = require('ms')

module.exports = {
    name: 'giveaway',
    description: 'A giveaway system for the server.',
    options: [{
            name: 'start',
            description: 'Starts a giveaway.',
            type: 'SUB_COMMAND',
            options: [{
                    name: 'duration',
                    description: 'Provide a duration for the giveaway (1m, 1h, 1d)',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'winners',
                    description: 'Provide the number of winners for the giveaway.',
                    type: 'INTEGER',
                    required: true
                },
                {
                    name: 'prize',
                    description: 'Provide the prize for the giveaway.',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'channel',
                    description: 'Provide the channel for the giveaway.',
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_TEXT']
                }
            ]
        },
        {
            name: 'actions',
            description: 'Actions for the giveaway.',
            type: 'SUB_COMMAND',
            options: [{
                    name: 'options',
                    description: 'Select an Option',
                    type: 'STRING',
                    required: true,
                    choices: [{
                            name: 'end',
                            value: 'end'
                        },
                        {
                            name: 'pause',
                            value: 'pause'
                        },
                        {
                            name: 'unpause',
                            value: 'unpause'
                        },
                        {
                            name: 'reroll',
                            value: 'reroll'
                        },
                        {
                            name: 'delete',
                            value: 'delete'
                        }
                    ]
                },
                {
                    name: 'message-id',
                    description: 'Provide the message id of the giveaway.',
                    type: 'STRING',
                    required: true
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const { options } = interaction
        const Sub = options.getSubcommand();

        const errEm = new MessageEmbed()
            .setColor('RED')

        const succEm = new MessageEmbed()
            .setColor('GREEN')

        switch (Sub) {
            case 'start':
                {
                    const gChannel = options.getChannel('channel') || interaction.channel
                    const duration = options.getString('duration')
                    const winnerCount = options.getInteger('winners')
                    const prize = options.getString('prize')

                    client.giveawaysManager.start(gChannel, {
                        duration: ms(duration),
                        winnerCount,
                        prize,
                        message: {
                            giveaway: '🎉 **GIVEAWAY STARTED** 🎉',
                            giveawayEnded: '🎊 **GIVEAWAY ENDED** 🎊',
                            winMessage: 'Congratulations, {winners}! You won **{this.prize}**!',
                        }
                    }).then(async() => {
                        succEm.setDescription(`Giveaway started in ${gChannel}`)
                        return interaction.reply({ embeds: [succEm], ephemeral: true })
                    }).catch(err => {
                        errEm.setDescription(`An error has occured\n\`${err}\``)
                        return interaction.reply({ embeds: [errEm], ephemeral: true })
                    })
                }
                break;
            case 'actions':
                {
                    const choice = options.getString('options');
                    const messageId = options.getString('message-id')

                    const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

                    // If no giveaway was found
                    if (!giveaway) {
                        errEm.setDescription(`No giveaway found with message id ${messageId} in this server.`)
                        return interaction.reply({ embeds: [errEm], ephemeral: true })
                    }

                    switch (choice) {
                        case 'end':
                            {
                                client.giveawaysManager.end(messageId).then(() => {
                                    succEm.setDescription('Giveaway ended')
                                    return interaction.reply({ embeds: [succEm], ephemeral: true })
                                }).catch((err) => {
                                    errEm.setDescription(`An error has occurred, please check and try again.\n\`${err}\``)
                                    return interaction.reply({ embeds: [errEm], ephemeral: true })
                                });
                            }
                            break;
                        case 'pause':
                            {
                                client.giveawaysManager.pause(messageId).then(() => {
                                    succEm.setDescription('Giveaway paused')
                                    return interaction.reply({ embeds: [succEm], ephemeral: true })
                                }).catch((err) => {
                                    errEm.setDescription(`An error has occurred, please check and try again.\n\`${err}\``)
                                    return interaction.reply({ embeds: [errEm], ephemeral: true })
                                });
                            }
                            break;
                        case 'unpause':
                            {
                                client.giveawaysManager.unpause(messageId).then(() => {
                                    succEm.setDescription('Giveaway has been unpaused')
                                    return interaction.reply({ embeds: [succEm], ephemeral: true })
                                }).catch((err) => {
                                    errEm.setDescription(`An error has occurred, please check and try again.\n\`${err}\``)
                                    return interaction.reply({ embeds: [errEm], ephemeral: true })
                                });
                            }
                            break;
                        case 'reroll':
                            {
                                client.giveawaysManager.reroll(messageId).then(() => {
                                    succEm.setDescription('Rerolled Giveaway')
                                    return interaction.reply({ embeds: [succEm], ephemeral: true })
                                }).catch((err) => {
                                    errEm.setDescription(`An error has occurred, please check and try again.\n\`${err}\``)
                                    return interaction.reply({ embeds: [errEm], ephemeral: true })
                                });
                            }
                            break;
                        case 'delete':
                            {
                                client.giveawaysManager.delete(messageId).then(() => {
                                    succEm.setDescription('Giveaway has been deleted')
                                    return interaction.reply({ embeds: [succEm], ephemeral: true })
                                }).catch((err) => {
                                    errEm.setDescription(`An error has occurred, please check and try again.\n\`${err}\``)
                                    return interaction.reply({ embeds: [errEm], ephemeral: true })
                                });
                            }
                            break;
                    }
                }
                break;
            default:
                {
                    console.log('Error in giveaway command.')
                }
        }
    }
}