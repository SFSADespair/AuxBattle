const { MessageEmbed, Message, WebhookClient } = require('discord.js')

module.exports = {
    name: 'messageDelete',
    /**
     * @param {Message} message
     */
    execute(message) {
        if (message.author.bot) return;

        const Log = new MessageEmbed()
            .setColor('#36393f')
            .setDescription(`🚮 A [message](${message.url}) by ${message.author} was **deleted**\n
            **Delete Message**:\n ${message.content ? message.content :'None'}`.slice(0, 4096))

        if (message.attachments.size >= 1) {
            Log.addField(`Attachments:`, `${message.attachments.map(a => a.url)}`, true)
        }

        new WebhookClient({ url: 'https://discord.com/api/webhooks/941093655136051240/m-PoVAzBmKIvtUrKpT9G-URDdQwYcUgaM7i63nSaxZAQOTJj0sZpK2HlnkP87KLuPHpe' })
            .send({ embeds: [Log] })
            .catch(err => console.log(err));
    }

}