import 'babel-polyfill';
import './fix';
import 'isomorphic-fetch';
import path from 'path';
import fs from 'fs';
// import Promise from 'bluebird';
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

console.log('#BOT START', );
console.log('process.env.TOKEN', process.env.TOKEN);
console.log('process.env.TASK_SLOT', process.env.TASK_SLOT);
console.log('process.env.SERVICE_NAME', process.env.SERVICE_NAME);

dotenv.config({ silent: true });
const token = process.env.TOKEN;
// console.log({ token });
// Promise.config = () => {}; // херов багфикс для телеграма
// let TelegramBot;
// try {
//   TelegramBot = require('node-telegram-bot-api');
// } catch (err) {
//   console.log('TelegramBot init', err);
// }


const actionClasses = [
  require('./actions/antons').default,
  require('./actions/odnoklassniki').default,
  require('./actions/bratishka').default,
  require('./actions/azazaz').default,
  require('./actions/bayan').default,
  require('./actions/tuesday').default,
  require('./actions/bratbratan').default,
  require('./actions/counter').default,
  require('./actions/mgbeta').default,
  require('./actions/mobx').default,
  require('./actions/boobs').default,
  require('./actions/today').default,
  require('./actions/win').default,
  require('./actions/satan').default,
  require('./actions/polundra').default,
];

const bot = new TelegramBot(token, { polling: true });
const freshDate = Date.now();

const actions = actionClasses.map((ActionClass) => {
  return new ActionClass(bot);
});

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, (message, match) => {
  const fromId = message.from.id;
  const resp = match[1];
  // console.log(message);
  bot.sendMessage(fromId, resp);
});

// Any kind of message
bot.on('message', (message) => {
  // console.log('M: ', message);
  //

  // if (message.sticker) {
  //   console.log('S: ', message.sticker.file_id);
  // }
  if (message.date * 1000 < freshDate) return false;
  actions.forEach((action) => {
    if (action.test(message)) {
      action.doAction(message);
    }
  });

  return false;
});
//
// bot.sendPhoto(80081115, 'AgADAgADhagxG-r-aUskTzaqcl_fFvMYrQ4ABIYQ7lB4_8D_XU4BAAEC', {
//   caption: 'message.caption',
// });

// bot.on('polling_error', err => {
//  console.log('ERROR', err);
//   const error = err.code;
//   const code = err.response && err.response.body && err.response.body.error_code;
//   if (error === 'ETELEGRAM' && code === 409) return;
//   console.log('ERROR', error, code);
// });

console.log('Bot successful runned');
