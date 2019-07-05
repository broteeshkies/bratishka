import Action from './Action';
import ferret from '../ferret';

let messages = [];
export default class GayAction extends Action {
  test(message) {
    messages.push(message);
    messages = messages.slice(messages.length - 2, messages.length);
    const res = this.testMessageRegExp(message, /хорёк/);
    return res;
  }

  doAction() {
    const message = messages[0];
    this.bot.forwardMessage(ferret(), message.from.id, message.message_id);
  }
}

