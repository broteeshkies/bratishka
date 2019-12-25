import Action from './Action';
import { deanonVoteCount } from '../config/consts'
import { mainChatId } from '../config/chats'
import sample from 'lodash/sample';
import get from 'lodash/get';
import { worker } from 'cluster';
import { anonMessages } from './PrivateMessageAction';

const deanonMessages = ({ username, deanons }) => {
  const msg = sample([
    `🙄 Такую хуету мог написать только ${username}`,
    `Вот ты и спалился, ${username}`,
    `Этим хорьком был А̶л̶ь̶б̶е̶р̶т̶ ̶Э̶й̶н̶ш̶т̶е̶й̶н̶ ${username}`,
    `!!!ВНЕЗАПНЫЙ ДЕАНОН!!!\nХорек — ${username}`,
    `Ну вы и так поняли, что это ${username}`,
    `По всем вопросам к n̶a̶t̶a̶v̶t̶s̶ ${username}`,
  ]);
  return `${deanons.map(e => `@${e}`).join(' ')}\n\n${msg}`;
};


export default class DeanonAction extends Action {
  test(message) {
    return message.chat.id === mainChatId && this.testMessageRegExp(message, /(deanon|деанон|дианон)/) || message.text === '?';
  }

  doAction(message) {
    if (message.reply_to_message) {
      const userPoll = message.from.username;
      console.log('DeanonAction.doAction', {anonMessages, userPoll});
      const keyMsgId = get(message, 'reply_to_message.message_id');
      console.log({keyMsgId});
      
      if (!keyMsgId) return;
      const anons = anonMessages[keyMsgId];
      console.log({anons});

      if (!anons) return;
      if (anons.count.includes(userPoll)) return;
      console.log('pushs');

      anons.count.push(userPoll);
      if (anons.count.length >= deanonVoteCount) {
        const { username } = anons;
        this.bot.sendMessage(mainChatId, deanonMessages({ username, deanons: anons.count }), {
          reply_to_message_id: keyMsgId,
        });
        delete anonMessages[message.message_id];
        //console.log(anons, 'anons after delete');
      }
    }
  }
}
