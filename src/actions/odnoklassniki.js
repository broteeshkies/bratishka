import Action from './Action';
import _ from 'lodash';

export default class OkAction extends Action {
  test(message) {
    if (message.text && this.percentProbability(5)) return true;
    return false;
  }

  async doAction(message) {
    const bot = this;
    const firstWord = _.shuffle(message.text.split(' '))[0].match(/[a-zA-Zа-яА-ЯёЁ]+/)[0];
    // console.log(firstWord);
    const url = `http://stavklass.ru/images/autocomplete.json?term=${encodeURI(firstWord)}`;

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
        this.sendMessage(message, story);
          // console.log(stories);
      });
  }
}
