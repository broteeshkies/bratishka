import Action from './Action';
import get from 'lodash/get';
import sample from 'lodash/sample';
const nataChatId = 80081115;
// const immuzovChatId = -1001130687597;
const mgbetaChatId = -1001042071273;
// const mgbetaChatId = nataChatId;

const deanonRatioStep = {};
const deanonLivesLimit = 3;
const deanonUsersLives = {};

const deanonNoticeMessages = [
  'осторожнее, молодой человек, там можно и на деанон нарваться ;)', 
  'АСТАНАВИСЬ пока не поздно', 
  'горшочек не вари', 
  'вангую тобi пiзда сдеаноню нахоуй!11', 
  '🙄 Посмотрите на этого бессмертно уёбка, давайте его сдеаноним?',
];

const deanonMessages = [
  `🙄 такую хуету мог написать только %username%`,
  `вот ты и спалился, %username%`,
  `этим хорьком был А̶л̶ь̶б̶е̶р̶т̶ ̶Э̶й̶н̶ш̶т̶е̶й̶н̶ %username%`,
  `!!!ВНЕЗАПНЫЙ ДЕАНОН!!!\nХорек — %username%`,
  `ну вы и так поняли, что это %username%`,
  `по всем вопросам к @̶n̶a̶t̶a̶v̶t̶s̶ %username%`,
];


const deanonRatioSteps = [
  0.380,
  0.780,
  1.474,
  2.512,
  3.222,
  5.570,
  8.474,
  11.894,
  13.683,
  15.798,
  18.211,
  20.154,
  24.930,
  30.210,
  36.039,
  42.264,
  48.112,
  57.142,
  66.666,
  75.000,
  82.352,
  88.888,
  94.736,
];

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

    // console.log(`@${data.username}: [log.${log}] ${text}`, path || message);
    if (data.method) {
      const sended = this.bot[method](chatId, path, opt);
      
      if (!deanonRatioStep[username]) {
        deanonRatioStep[username] = 0;
      }
      
      if (deanonUsersLives[username] == null) {
        deanonUsersLives[username] = Math.floor(Math.random() * deanonLivesLimit + 1);
      }

      deanonRatioStep[username] = deanonRatioStep[username] < deanonRatioSteps.length - 1 ? deanonRatioStep[username] + 1 : deanonRatioStep[username];
      
      // if (['natavts', 'anoru', 'immuzov'].includes(username)) return; // NOTE: Ха-ха, смешно :) 

      console.log(`${username} (${deanonRatioSteps[deanonRatioStep[username]]}%, lives: ${deanonUsersLives[username]}):\t${this.percentProbability(deanonRatioSteps[deanonRatioStep[username]]) ? '-1 lives (or deanon)' : 'keep calm'}` ); 
      
      if (this.percentProbability(deanonRatioSteps[deanonRatioStep[username]])) {
        if (deanonUsersLives[username] > 0) {
          deanonUsersLives[username] = deanonUsersLives[username] - 1;
          sended.then((msg) => {
            this.bot.sendMessage(chatId, sample(deanonNoticeMessages), {
              reply_to_message_id: msg.message_id
            });
          });
          return;
        }

        sended.then((msg) => {
          this.bot.sendMessage(chatId, sample(deanonMessages).replace('%username%', `@${username}`), {
            reply_to_message_id: msg.message_id
          });
        });
        deanonUsersLives[username] = null;
        deanonRatioStep[username] = 0;
      }
    }
  }
}
