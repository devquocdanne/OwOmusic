const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logger } = require("../../utils/logger");
const config = require("../../config");

module.exports = {
	data: new SlashCommandBuilder()
   	    .setName("pause")
   	    .setDescription("Tạm dừng bản nhạc hiện tại")
        .setDMPermission(false),

    run: async ({ interaction, client }) => {
        const embed = new EmbedBuilder().setColor(config.clientOptions.embedColor);

        try {
            const player = client.riffy.players.get(interaction.guildId);

            if (!player) {
                return interaction.reply({ 
                    embeds: [embed.setDescription("\`❌\` | Không tìm thấy người chơi nào trong máy chủ này.")],  
                    ephemeral: true 
                });
            }

            if (player.paused) {
                return interaction.reply({ 
                    embeds: [embed.setDescription("\`❗\` | Người chơi đã tạm dừng.")],  
                    ephemeral: true 
                });
            }

            player.pause(true);
            return interaction.reply({ 
                embeds: [embed.setDescription("\`⏸\` | Tạm dừng bản nhạc hiện tại.")],  
                ephemeral: true 
            });
            
        } catch (err) {
            logger(err, "error");   
            return interaction.reply({ 
                embeds: [embed.setDescription(`\`❌\` | Đã xảy ra lỗi: ${err.message}`)],  
                ephemeral: true 
            });
        }
    },
	options: {
		inVoice: true,
		sameVoice: true,
	}
};