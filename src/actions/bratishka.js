import Action from './Action';

export default class BatishkaAction extends Action {

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
    const chatId = message.chat.id || message.from.id;
    this.bot.sendMessage(chatId, this.messages[this.randomInteger(0, this.messages.length - 1)]);
  }
}
