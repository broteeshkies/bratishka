import Action from './Action';
import get from 'lodash/get';
import sample from 'lodash/sample';
import { deanonVoteTime } from '../config/consts';
import { repostChatId } from '../config/chats';

export const anonMessages = {};

export default class PrivateMessageAction extends Action {
  // name = 'PrivateMessageAction;
  constructor(...args) {
    super(...args);
    this.name = 'PrivateMessageAction';
  }

  test(message) {
    return message.chat.id > 0;
  }

  doAction(message) {
    const { first_name, last_name, username } = message.from;
    anonMessages[message.message_id] = { message, count: [], username };
    setTimeout(() => {
      delete anonMessages[message.message_id];
    }, deanonVoteTime);
    return this.repost({
      chatId: repostChatId,
      message
    });
  }
}
