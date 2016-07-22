import Action from './Action';

export default class SatanAction extends Action {
  test (message) {
    return this.testMessageRegExp(message, /зачем/);
  }

  doAction(message) {
    const chatId = message.chat.id || message.from.id;
    this.bot.sendSticker(chatId, 'BQADAQADWgIAAnTnKwLPa-RFq1jeRQI');
    this.bot.sendMessage(chatId, 'ВО СЛАВУ САТАНЕ, КОНЕЧНО!');
  }
}
