// This makes the command cannot be executed when member is not in a vc
module.exports = ({ interaction, commandObj }) => {
    if (commandObj.options?.inVoice) {
        if (interaction.isAutocomplete() || interaction.isButton()) return;
        
        const memberChannel = interaction.member.voice.channelId;
        if (!memberChannel) {
            if (interaction.deferred) {
                return interaction.editReply({ 
                    content: `\`❌\` | Bạn phải ở trong kênh thoại để sử dụng lệnh này.`, 
                    ephemeral: true 
                });
            } else {
                return interaction.reply({ 
                    content: `\`❌\` | Bạn phải ở trong kênh thoại để sử dụng lệnh này.`, 
                    ephemeral: true 
                });
            }
        }
    }
};

