import Action from './Action';
const videoChatId = -368345831;

export default class onlyVideo extends Action {
    test(message) {
        return !message.video_note && message.chat.id === videoChatId;
    }
    doAction(message) {
        this.deleteMessage(message.chat.id, message.message_id);
        this.bot.sendVideoNote(message.chat.id, 'DQADAgAD-gMAAqlagUm_49HHEQjRIhYE'); //file_id надо указать доступный
    }
}
