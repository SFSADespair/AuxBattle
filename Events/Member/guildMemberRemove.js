const { Client, WebhookClient, MessageEmbed, GuildMember } = require('discord.js')

module.exports = {
    name: 'guildMemberRemove',
    /**
     * @param {GuildMember} member
     */
    execute(member) {
        const { user, guild } = member //Instead of typing member.user you can just use user same with guild

        const Logger = new WebhookClient({
            id: '941091582596231248',
            token: 'FFyqi1XKRzQ_H0KvQG1atMyt68zPxzZDk5zykC6oKwDqpgKxDsxTHIGE9UmSJew_yqkC'
        })

        const Welcome = new MessageEmbed()
            .setColor('RED')
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true, size: 512 }) })
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setDescription(`
            FUCK YOU ${member}\n
            Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\n
            Latest Member Count: **${guild.memberCount}**`)
            .setFooter({
                text: `ID: ${user.id}`
            })

        Logger.send({ embeds: [Welcome] })
    }
}