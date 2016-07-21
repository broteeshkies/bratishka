import Action from './Action';
const mgbetaChatId = -1001042071273;
export default class BatishkaAction extends Action {
  test (message) {
    return this.testMessageRegExp(message, /^mgbeta/);
  }

  doAction(message) {
    const text = message.text.substr(7);
    // console.log(message)
    // const chatId = message.chat.id || message.from.id;
    this.bot.sendMessage(mgbetaChatId, text);
  }
}
