import ready from '@lskjs/utils/polyfill';
import './fix';
import 'isomorphic-fetch';
import TelegramBot from 'node-telegram-bot-api';
import getActions from './actions';
import config from './config';
ready();

console.log({config});

const bot = new TelegramBot(config.token, { polling: true });
const freshDate = Date.now();
const actions = getActions({ bot });

bot.on('message', (message) => {
  if (__DEV__) console.log('[M] ', message);
  if (message.text === 'ping') {
    console.log('pong');
    bot.sendMessage( message.from.id, 'pong');
    return ;
  }
  // if (message.sticker) {
  //   console.log('S: ', message.sticker.file_id);
  // }
  if (message.date * 1000 < freshDate) return false;
  actions.forEach((action) => {
    action.log('test');
    try {
      if (action.test(message)) {
        action.doAction(message);
      }
    } catch (err) {
      console.log('Error in ' + action.name, err);
    }
  });

  return false;
});
console.log('Bot successful runned with ' + actions.length + ' actions');

setTimeout(() => {
  actions.forEach(action => {
    if (action.run) action.run();
  })
}, 1000);
