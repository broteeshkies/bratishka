import Action from './Action';

import { repostChatId, mediaChatId } from '../config/chats'

const likes = ['+', '👍', '➕'].map(a => a.codePointAt(0));
export default class RepostAction extends Action {
  constructor(...args) {
    super(...args);
    this.name = 'RepostAction';
  }

  test(message) {
    return true
  }

  doAction(message) {
    this.log('doAction');
    if (!!message.video_note && message.chat.id !== mediaChatId) {
      this.bot.sendVideoNote(mediaChatId, message.video_note.file_id);
    } 
    
    let firstSign;
    if (message && message.text && message.text.codePointAt) {
      firstSign =  message.text.codePointAt(0);
    } else if (message && message.sticker && message.sticker.emoji) {
      firstSign = message.sticker.emoji.codePointAt(0);
    }
    if (firstSign && likes.includes(firstSign) && !!message.reply_to_message) {
      this.repost({
        chatId: repostChatId,
        forwardFrom: (message.chat && message.chat.id) || (message.from && message.from.id),
        message: message.reply_to_message,
      });
    }
  }
}
