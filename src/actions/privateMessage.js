import Action from './Action';
import get from 'lodash/get';
import sample from 'lodash/sample';
import { reportChatId } from '../config/chats';

export const anonMessages = {};
const pollTime = 1000 * 60 * 7; // продоложительность опроса в мс.

export default class MgbetaAction extends Action {
  test(message) {
    return message.chat.id > 0;
  }

  doAction(message) {
    const { first_name, last_name, username } = message.from;
    anonMessages[message.message_id] = { message, count: [], username };
    setTimeout(() => {
      delete anonMessages[message.message_id];
    }, pollTime);
    return this.repost({
      chatId: reportChatId,
      message
    });
  }
}
