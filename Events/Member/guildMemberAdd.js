const { Client, WebhookClient, MessageEmbed, GuildMember } = require('discord.js')

module.exports = {
    name: 'guildMemberAdd',
    /**
     * @param {GuildMember} member
     */
    execute(member) {
        const { user, guild } = member //Instead of typing member.user you can just use user same with guild

        member.roles.add('659046008503926801')

        const Welcomer = new WebhookClient({
            id: '941091582596231248',
            token: 'FFyqi1XKRzQ_H0KvQG1atMyt68zPxzZDk5zykC6oKwDqpgKxDsxTHIGE9UmSJew_yqkC'
        })

        const Welcome = new MessageEmbed()
            .setColor('PURPLE')
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true, size: 512 }) })
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setDescription(`
            Welcome ${member} to dumbest server famshamalam which is **${guild.name}**\n
            Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\n
            Latest Member Count: **${guild.memberCount}**`)
            .setFooter({
                text: `ID: ${user.id}`
            })

        Welcomer.send({ embeds: [Welcome] })
    }
}