import Action from './Action';
import { anonMessages, mgbetaChatId, REPLY_COUNT } from './mgbeta';
import sample from 'lodash/sample';
import get from 'lodash/get';
import { worker } from 'cluster';

const deanonMessages = [
  `🙄 такую хуету мог написать только %username%`,
  `вот ты и спалился, %username%`,
  `этим хорьком был А̶л̶ь̶б̶е̶р̶т̶ ̶Э̶й̶н̶ш̶т̶е̶й̶н̶ %username%`,
  `!!!ВНЕЗАПНЫЙ ДЕАНОН!!!\nХорек — %username%`,
  `ну вы и так поняли, что это %username%`,
  `по всем вопросам к @̶n̶a̶t̶a̶v̶t̶s̶ %username%`,
];


export default class deanonVotes extends Action {
  test(message) {

    if (message.chat.id < 0 && this.testMessageRegExp(message, /deanon/)) {
      return true;
    }
    return false;
  }

  doAction(message) {
    if (message.reply_to_message) {
      let userPoll = message.from.username;
      let keyMsgId = get(message, 'reply_to_message.message_id');
      if (!keyMsgId) return;
      const anons = anonMessages[keyMsgId];
      if (!anons) return;
      if (anons.count.includes(userPoll)) return;
      anons.count.push(userPoll);
      if (anons.count.length >= REPLY_COUNT) {
        const { user } = anons;
        this.bot.sendMessage(mgbetaChatId, sample(deanonMessages).replace('%username%', `${user}`), {
          reply_to_message_id: keyMsgId,
        });
        delete anonMessages[message.message_id];
        //console.log(anons, 'anons after delete');
      }
    }
  }
}
