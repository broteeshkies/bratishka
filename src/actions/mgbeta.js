import Action from './Action';
const nataChatId = 80081115;
const mgbetaChatId = -1001042071273;
export default class MgbetaAction extends Action {
  test(message) {
    return message.chat.id > 0;
    if (message.chat.id > 0) return true;
    return false;
    // return this.testMessageRegExp(message, /^mgbeta/);
  }

  doAction(message) {

    const firstName = message.from.first_name;
    const lastName = message.from.last_name;
    const username = message.from.username;
    // console.log(1112454);
    // console.log({message});
    // const chatId = nataChatId;
    const chatId = mgbetaChatId;
    if (message.sticker) {
      console.log(`@${username}: [log.sticker]`, message.sticker.file_id);
      this.bot.sendSticker(chatId, message.sticker.file_id);

      return;
    }
    if (message.photo) {
      console.log(`@${username}: [log.photo] ${message.caption || ''}`, message.photo[0].file_id);
      this.bot.sendPhoto(chatId, message.photo[0].file_id, {
        caption: message.caption,
      });

      return;
    }
    if (message.voice) {
      console.log(`@${username}: [log.voice] `, message.voice.file_id);
      this.bot.sendVoice(chatId, message.voice.file_id);

      return;
    }
    if (message.video_note) {
      console.log(`@${username}: [log.videoNote] `, message.video_note.file_id);
      this.bot.sendVideoNote(chatId, message.video_note.file_id);

      return;
    }
    if (message.video) {
      console.log(`@${username}: [log.video] `, message.video.file_id);
      this.bot.sendVideo(chatId, message.video.file_id);

      return;
    }
    if (message.location) {
      console.log(`@${username}: [log.location] `, message.location.latitude, message.location.longitude);
      this.bot.sendLocation(chatId, message.location.latitude, message.location.longitude);
      return;
    }
    if (message.document) {
      console.log(`@${username}: [log.document] ${message.caption || ''} ${message.document.file_id}`);
      this.bot.sendDocument(chatId, message.document.file_id, {
        caption: message.caption,
      });

      return;
    }
    if (message.text) {
      console.log(`@${username}: [log.text] ${message.text}`);
      // const text = message.text.substr(7);
      this.bot.sendMessage(chatId, message.text);
      return ;
    }
    console.log(`@${username}: [log.HZHZHHZHZ] ${text}`, message);

  }
}
