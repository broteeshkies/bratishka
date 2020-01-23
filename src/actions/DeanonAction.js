import Action from "./Action";
import { deanonVoteCount } from "../config/consts";
import { mainChatId } from "../config/chats";
import sample from "lodash/sample";
import get from "lodash/get";
import { anonMessages } from "./PrivateMessageAction";

const deanonMessages = ({ anonUser, deanons }) => {
  const username = anonUser.username || anonUser.id;
  const msg = sample([
    `🙄 Такую хуету мог написать только <b>${username}</b>`,
    `Вот ты и спалился, <b>${username}</b>`,
    `Этим хорьком был А̶л̶ь̶б̶е̶р̶т̶ ̶Э̶й̶н̶ш̶т̶е̶й̶н̶ <b>${username}</b>`,
    `!!!ВНЕЗАПНЫЙ ДЕАНОН!!!\nХорек — <b>${username}</b>`,
    `Ну вы и так поняли, что это <b>${username}</b>`,
    `По всем вопросам к n̶a̶t̶a̶v̶t̶s̶ <b>${username}</b>`
  ]);
  return `${deanons.map(e => `@${e}`).join(" ")}\n\n${msg}`;
};

export default class DeanonAction extends Action {
  constructor(...args) {
    super(...args);
    this.name = "DeanonAction";
  }

  test(message) {
    // а почему только главный чат??
    return (
      message.chat.id === mainChatId &&
      (this.testMessageRegExp(message, /(deanon|деанон|дианон)/) ||
        message.text === "?")
    );
  }

  doAction(message) {
    this.log("doAction");
    if (message.reply_to_message) {
      const deanonUsername = message.from.username;
      const deanonUserId = message.from.id;
      const keyMsgId = get(message, "reply_to_message.message_id");
      if (!keyMsgId) return;
      const anons = anonMessages[keyMsgId];
      if (!anons) return;
      if (anons.count.includes(deanonUserId)) return;
      anons.count.push(deanonUserId);
      anons.deanons.push(deanonUsername);
      if (anons.count.length >= deanonVoteCount) {
        const { anonUser } = anons;
        this.bot.sendMessage(
          mainChatId,
          deanonMessages({ anonUser, deanons: anons.deanons }),
          {
            reply_to_message_id: keyMsgId,
            parse_mode: "html"
          }
        );
        delete anonMessages[message.message_id];
        //console.log(anons, 'anons after delete');
      }
    }
  }
}
