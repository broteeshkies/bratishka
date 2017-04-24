import Action from './Action';

export default class BoobsAction extends Action {
  test(message) {
    return this.testMessageRegExp(message, /сис(ек|ьки|ечки|и|яндры)/);
  }

  doAction(message) {
    const chatId = message.chat.id || message.from.id;
    this.bot.sendSticker(chatId, 'BQADAgADAgIAAhC6EgABOZ7L55JaKysC');
  }
}

//
// { message_id: 6465,
//   sticker:
//    { width: 512,
//      height: 512,
//      emoji: '😘',
//      thumb:
//       { file_id: 'AAQCABN6ZXENAATkBZvOfHisURIUAAIC',
//         file_size: 4800,
//         width: 128,
//         height: 128 },
//      file_id: 'BQADAgADAgIAAhC6EgABOZ7L55JaKysC',
//      file_size: 35192 } }
