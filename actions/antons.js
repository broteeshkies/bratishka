import Action from './Action';

export default class AntonsAction extends Action {
  test (message) {
    return this.testMessageRegExp(message, /антонс/);
  }

  doAction(message) {
    this.bot.sendMessage(message.from.id, 'Борисович');
  }
}
