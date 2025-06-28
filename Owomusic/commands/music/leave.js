const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logger } = require("../../utils/logger");
const config = require("../../config");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("Làm cho bot rời khỏi kênh thoại hiện tại mà chúng đang ở")
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

            player.stop();
            player.destroy();
            return interaction.reply({ embeds: [embed.setDescription("\`⏹️\` Bot đã rời khỏi kênh.")] });

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