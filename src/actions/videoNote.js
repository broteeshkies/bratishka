import Action from './Action';
const nataChatId = 80081115;
const mgbetaChatId = -1001042071273;
const botovodChatId = -1001138695583;
const pornoChatId = -1001296980004;
export default class VideoNote extends Action {
  test(message) {
    return !!message.video_note;
  }

  doAction(message) {
    const chatId = pornoChatId;
    this.bot.sendVideoNote(chatId, message.video_note.file_id);
  }
}
