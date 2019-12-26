import sample from 'lodash/sample';
import Action from './Action';


let prevMessage = null;
export default class GayAction extends Action {
  constructor(...args) {
    super(...args);
    this.name = 'GayAction';
  }

  test(message) {
    return this.testMessageRegExp(message, /гей|пидор|pidor|секс|хуй|стоял/);
  }

  async doAction(message) {
    this.log('doAction');
    const gifs = [ // Взял гифки из логов, хз что там в них
      'CgADAgADogIAAvLPCEhv8LYMDZzZHQI',
      'CgADBAADzKkAAt4cZAfc21j3XfislgI',
      'CgADBAADyGIAAiMZZAcdNDAPXJUK9QI',
      'CgADAgADwgMAAkRpMUhMVDHg1UOsqAI',
      'CgADBAADqAADdy0EUpJ6qP7lnNhwAg',
      'CgADAgADwwEAAliJeUsa1NZsh1pZMgI',
      'CgADBAADGgUAAsYXZAe9x3bykoXNwgI',
      'CgADAgADoAIAAvLPCEjhMDHWvwbHDAI',
      'CgADAgADnwIAAvLPCEiDVzs9IxYcaQI',
    ];
    const gif = sample(gifs);

    const res = await this.bot.sendDocument(message.chat.id, gif);
    console.log({res});
    
  }
}

