import Action from './Action';

import { repostChatId, mediaChatId } from '../config/chats'

export default class RepostAction extends Action {
  // name = 'ReportAction;
  constructor(...args) {
    super(...args);
    this.name = 'RepostAction';
  }

  test(message) {
    return true
  }

  doAction(message) {
    if (!!message.video_note && message.chat.id !== mediaChatId) {
      this.bot.sendVideoNote(mediaChatId, message.video_note.file_id);
    } 
    if (message.text === '+' && !!message.reply_to_message) {
      console.log('REPLY!!!!');
      this.repost({
        chatId: repostChatId,
        message
      });
    }
  }
}
