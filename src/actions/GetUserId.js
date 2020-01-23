import Action from "./Action";

export default class GetUserId extends Action {
  constructor(...args) {
    super(...args);
    this.name = "GetUserIdAction";
  }

  test(message) {
    return this.testMessageRegExp(message, /(id|ид|айди)/);
  }

  doAction(message) {
    this.log("doAction");
    const reply = message.reply_to_message;
    if (reply) {
      return this.bot.sendMessage(message.chat.id, reply.from.id);
    }
    this.bot.sendMessage(message.chat.id, message.from.id);
  }
}
