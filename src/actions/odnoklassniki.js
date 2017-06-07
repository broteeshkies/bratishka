import Action from './Action';
import http from 'http';
import _ from 'lodash';

export default class OkAction extends Action {
  test(message) {
    if (message.text && this.sendLimiter(1, 20)) return true;
    return false;
  }

  async doAction(message) {
    const bot = this;
    // console.log(message.text, message.text.match(/\w+/u));
    const firstWord = message.text.match(/[a-zA-Zа-яА-ЯёЁ]+/)[0] || 'йцу';
    console.log(firstWord);
    // try{
    const url = `http://stavklass.ru/images/autocomplete.json?term=${encodeURI(firstWord)}`;
      // } catch(e) {
      //   console.log(e);
      // }

    fetch(url)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((stories) => {
        if (!stories.length) return;
        const story = _.shuffle(stories)[0];
        bot.sendMessage(message, story);
          // console.log(stories);
      });
  }
}
