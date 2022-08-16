const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'clear',
    description: 'Clears the chat by specified amount',
    permission: 'MANAGE_MESSAGES',
    options: [{
            name: 'amount',
            description: 'The amount of messages to delete',
            type: 'NUMBER',
            required: true
        },
        {
            name: 'target',
            description: 'The target to delete messages from',
            type: 'USER',
            required: false
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { channel, options } = interaction

        const amount = options.getNumber('amount')
        const Target = options.getMember('target')

        const Messages = await channel.messages.fetch()

        const Response = new MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK')

        if (Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if (m.author.id === Target.id && amount > i) {
                    filtered.push(m)
                    i++;
                }
            })
            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`VOETSEK‼ 💥. I have deleted ${messages.size} messages from ${Target}`)
                interaction.reply({ embeds: [Response] })
            })
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                Response.setDescription(`👀. I have deleted ${messages.size} messages from this channel.`)
                interaction.reply({ embeds: [Response] })
            })
        }
    }
}