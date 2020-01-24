import Action from "./Action";

export default class GetUserId extends Action {
  constructor(...args) {
    super(...args);
    this.name = "GetUserIdAction";
  }

  test(message) {
    return this.testMessageRegExp(message, /^(id|ид|айди)$/);
  }

  doAction(message) {
    this.log("doAction");
    const reply = message.reply_to_message;
    const chatId = message.chat.id;
    let messageId = message.message_id;
    let userId = message.from.id;

    if (reply) {
      userId = reply.from.id;
      messageId = reply.message_id;
    }

    this.bot.sendMessage(chatId, userId,
      {
        reply_to_message_id: messageId,
        parse_mode: "html"
      });
  }
}
