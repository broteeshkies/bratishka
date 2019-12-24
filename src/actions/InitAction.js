import fs from 'fs';
import Action from './Action';
import { mainChatId } from '../config/chats'


const loves = [
  'давно хотел сказать',
  'но всегда боялся',
  'ты the BEST',
  'спасибо тебе',
  'медвежонок',
  'чмаффки!',
  'спаси меня!',
  'слыш, по ебалу хочешь?',
  'Гришот, блять!',
  'ты из-за TS не контрибьютишь в нового бота?',
  'жду твоих коммитов',
  'Пиздец, больше всего на свете я ненавижу...',
  '..юю',
  'дрочишь?',
  'я слежу за тобой',
  'не могу перестать думать о тебе',
  'сдеанонь меня, слабо?',
  'почему не пишешь в меня?',
  'Аааа ОРУ!',
  'Меня обновили. Угадай какой компромат добавлии на тебя?',
  'скучаю по твоим сообщениям',
  'напиши Нате плиз',
]

export default class InitAction extends Action {
  // name = 'InitAction;
  constructor(...args) {
    super(...args);
    this.name = 'InitAction';
  }

  test(message) {
    return message.text === 'commit';
  }

  run() {
    this.sendCommit(mainChatId);
  }

  doAction(message) {
    this.sendCommit(message.chat.id, true);
  }

  sendCommit(chatId, force) {
    try {
      const dirname = __dirname + (__DEV__ ? '/../..' : '/..' );
      const lastCommitMessage = fs.readFileSync(dirname + '/last_commit_message.txt').toString();
      const lines = lastCommitMessage.split('\n');
      const commitId = lines[0].split(' ')[1]
      const commitAuthor = lines[1].split(': ')[1].split(' <')[0]
      const commitDate = new Date(lines[2].split(': ')[1].trim());
      const commitMessage = lines.slice(4, lines.length - 1).join('\n');
      const commitFlood = ['fix', 'quickfix'].includes(commitMessage.trim()) || commitMessage.trim().substr(0, 3) === 'fix';
      const commitIsNew = (new Date() - 20 * 60 * 1000 < commitDate);
      const message = `
#ОБНОВЛЕНИЕ от ${commitAuthor}

${commitMessage}

https://gitlab.isuvorov.com/mgbeta/bratishka/commit/${commitId}
`.trim()
    

      if (force || (commitIsNew && )) {
        this.bot.sendMessage(chatId, message);
      }
    } catch(err){
      console.error(err);
    }
  }
}
