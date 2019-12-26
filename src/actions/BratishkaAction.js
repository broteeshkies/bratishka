import Action from './Action';
import sample from 'lodash/sample';

export default class BratishkaAction extends Action {
  constructor(...args) {
    super(...args);
    this.name = 'BratishkaAction';
  }

  messages = [
    'да-да?',
    'кто меня звал?',
    'да чего сразу братишка?',
    'да, я крутой',
    'не братишка ты мне, петух',
  ]

  test(message) {
    return this.testMessageRegExp(message, /братишк(а|и)/);
  }

  doAction(message) {
    this.log('doAction');
    this.sendMessage(message, sample(this.messages));
  }
}
