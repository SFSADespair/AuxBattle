const { MessageEmbed, Message, WebhookClient } = require('discord.js')

module.exports = {
    name: 'messageUpdate',
    /**
     * @param {Message} oldMessage
     * @param {Message} newMessage
     */
    execute(oldMessage, newMessage) {
        if (oldMessage.author.bot) return; //igonres the message if it was sent by a bot
        if (oldMessage.content === newMessage.content) return;

        const Count = 1950;
        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > Count ? '...' : '');
        const New = newMessage.content.slice(0, Count) + (newMessage.content.length > Count ? '...' : '');

        const Log = new MessageEmbed()
            .setColor('#36393f')
            .setDescription(`📘 A [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}.\n
            **Orginal**:\n  ${Original} \n **Edited**: \n  ${New} `)
            .setFooter({
                text: `Member: ${newMessage.author.tag} | ID: ${newMessage.author.id}`
            })

        new WebhookClient({ url: 'https://discord.com/api/webhooks/941093655136051240/m-PoVAzBmKIvtUrKpT9G-URDdQwYcUgaM7i63nSaxZAQOTJj0sZpK2HlnkP87KLuPHpe' })
            .send({ embeds: [Log] })
            .catch(err => console.log(err));
    }
}