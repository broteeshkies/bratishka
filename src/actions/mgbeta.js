import Action from './Action';
import get from 'lodash/get';
import sample from 'lodash/sample';
const nataChatId = 80081115;
const mgbetaChatId = -1001042071273;
// const mgbetaChatId = nataChatId;
export default class MgbetaAction extends Action {
  test(message) {
    return message.chat.id > 0;
    if (message.chat.id > 0) return true;
    return false;
    // return this.testMessageRegExp(message, /^mgbeta/);
  }

  doAction(message) {
    const { first_name, last_name, username } = message.from;

    const data = {
      first_name,
      last_name,
      username,
      chatId: mgbetaChatId,
      log: 'log.HZHZHZHZHZ',
      opt: {},
    }
    if (message.sticker) {
      data.method = 'sendSticker';
      data.path = message.sticker.file_id;
      data.log = 'sticker';
    }
    if (message.photo) {
      data.method = 'sendPhoto';
      data.text = message.caption || '';
      data.path = message.photo[0].file_id;
      data.log = 'photo';
      data.opt = {
        caption: message.caption,
      };
    }
    if (message.voice) {
      data.method = 'sendVoice';
      data.path = message.voice.file_id;
      data.log = 'voice';
    }
    if (message.video_note) {
      data.method = 'sendVideoNote';
      data.path = message.video_note.file_id;
      data.log = 'videoNote';
    }
    if (message.video) {
      data.method = 'sendVideo';
      data.path = message.video.file_id;
      data.log = 'video';
    }
    if (message.location) {
      data.method = 'sendLocation';
      data.path = message.location.latitude;
      data.log = 'location';
      data.opt = message.location.longitude;
    }
    if (message.document) {
      data.method = 'sendDocument';
      data.path = message.document.file_id;
      data.log = 'document';
      data.opt = {
        caption: message.caption,
      };
    }
    if (message.text) {
      data.method = 'sendMessage';
      data.path = message.text;
      data.log = 'text';
    }

    const { method, chatId, path, text = 'empty message', log, opt } = data;

    console.log(`@${data.username}: [log.${log}] ${text}`, path || message);
    if (data.method) {
      const sended = this.bot[method](chatId, path, opt);
      const deanonText = sample([
        `🙄 это @${username}`,
        `вот ты и спалился @${username}`,
        `этим хорьком был @${username}`,
        `!!!ВНЕЗАПНЫЙ ДЕАНОН!!!
Хорек @${username}`,
        `ну вы и так поняли, что это @${username}`,
        `по всем вопросам к @${username}`
      ]);
      if (this.percentProbability(5)) {
        sended.then((msg) => {
          this.bot.sendMessage(chatId, deanonText, {
            reply_to_message_id: msg.message_id
          });
        });
      }
    }
  }
}
