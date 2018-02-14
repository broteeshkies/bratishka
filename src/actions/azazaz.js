import sample from 'lodash/sample';
import Action from './Action';

export default class AzazaAction extends Action {

  messages = [
    'очень весело',
    ')))))))))))))))))))))))))))))))))))))))))))))))',
    'ахаха ахаха ахаха',
    '😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂',
    'азаза просто',
    ':DDDDDDDDDDDDDDDDDDDDDDDDDDD',
    'x-DDDDDDDDDDDDDDDDDDDDDDDDDDD',
  ]

  test(message) {
    return this.testMessageRegExp(message, /\){4,}/);
  }

  doAction(message) {
    this.sendMessage(message, sample(this.messages));
  }
}
