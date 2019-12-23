import Action from './Action';

export { reportChatId } from '../config/chats'

export default class ReportAction extends Action {
  // name = 'ReportAction;
  constructor(...args) {
    super(...args);
    this.name = 'ReportAction';
  }
  test(message) {
    // console.log(11111, message);
    return true
  }

  doAction(message) {
    const chatId = pornoChatId;
    // console.log(22222);
    // console.log({message});
    if (!!message.video_note && message.chat.id !== pornoChatId) {
      this.bot.sendVideoNote(chatId, message.video_note.file_id);
    } 
    if (message.text === '+' && !!message.reply_to_message) {
      console.log('REPLY!!!!');
      this.report({
        chatId: reportChatId,
        message
      });
    }

  }
}
