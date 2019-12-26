import Action from './Action';
const videoChatId = -368345831;

export default class OnlyVideoAction extends Action {
  constructor(...args) {
    super(...args);
    this.name = 'OnlyVideoAction';
  }

  test(message) {
    return !message.video_note && message.chat.id === videoChatId;
  }

  doAction(message) {
    this.log('doAction');
    this.deleteMessage(message.chat.id, message.message_id);
    this.bot.sendVideoNote(message.chat.id, 'DQADAgAD-gMAAqlagUm_49HHEQjRIhYE'); //file_id надо указать доступный
  }
}
