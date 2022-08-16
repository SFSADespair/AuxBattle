const { CommandInteraction, MessageEmbed } = require("discord.js");


module.exports = {
    name: 'suggest',
    description: 'Creaate a suggestion in an organised matter',
    options: [{
            name: 'type',
            description: 'Select the type.',
            required: true,
            type: 'STRING',
            choices: [{
                    name: 'Command',
                    value: 'Command'
                },
                {
                    name: 'Event',
                    value: 'Event'
                },
                {
                    name: 'System',
                    value: 'System'
                }
            ]
        },
        {
            name: 'name',
            description: 'Provide a ame for your suggestion',
            type: 'STRING',
            required: true
        },
        {
            name: 'functionality',
            description: 'Describe the functionality of your suggestion',
            type: 'STRING',
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { options } = interaction

        const type = options.getString('type')
        const name = options.getString('name')
        const funcs = options.getString('functionality')

        const Response = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`${interaction.member} has suggested a ${type}.`)
            .addField('Name', `${name}`, true)
            .addField('Functionality', `${funcs}`, true)

        const msg = await interaction.reply({ embeds: [Response], fetchReply: true })
        msg.react('✅')
        msg.react('❌')
    }
}