import sample from 'lodash/sample';
import Action from './Action';

export default class AdminAction extends Action {
  constructor(...args) {
    super(...args);
    this.name = 'AdminAction';
  }

  test(message) {
    return this.testMessageRegExp(message, /^\/chatid|^\/happy/);
  }

  async doAction(message) {
    if (this.testMessageRegExp(message, /^\/chatid/)) {
      this.sendMessage(message, `user: ${message.from && message.from.id}\nchaitid: ${message.chat && message.chat.id}`);
    }
    if (this.testMessageRegExp(message, /^\/happy/)) {
      const chatId = message.chat.id;
      // console.log('message', message);
      const [username, ...messageTexts] = (message.text || '').substr('/happy '.length).split(' ');
      const messageText = messageTexts.join(' ');
      const chat = await this.bot.getChat(chatId)
      // console.log({username});
      // const memeber = await this.bot.getChat(username)
      // console.log({memeber});
      // chat.title
      // console.log({res});
      // const memeber = await this.bot.getChatMember(chatId, username)
      
      this.bot.setChatTitle(chatId, `С днем рождения ` + username + ' ' + messageText + ' // ' + chat.title);
    }
  }
}
