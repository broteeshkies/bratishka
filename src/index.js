//var path = require('path');
//
//
import 'babel-polyfill';
import 'isomorphic-fetch';
import dotenv from 'dotenv';
dotenv.load();

import path from 'path';
import request from 'request';
import fs from 'fs';
import TelegramBot from 'node-telegram-bot-api';
const token = process.env.TOKEN;

const actionClasses = [
  require('./actions/antons').default,
  require('./actions/odnoklassniki').default,
  require('./actions/bratishka').default,
  require('./actions/tuesday').default,
  require('./actions/bratbratan').default,
  require('./actions/counter').default,
  require('./actions/mgbeta').default,
  require('./actions/mobx').default,
  require('./actions/boobs').default,
  require('./actions/today').default,
  require('./actions/win').default,
  require('./actions/satan').default,
];

const bot = new TelegramBot(token, { polling: true });
const freshDate = Date.now();

const actions = actionClasses.map(function (ActionClass) {
  return new ActionClass(bot);
});

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (message, match) {
    const fromId = message.from.id;
    const resp = match[1];
    console.log(message);
    bot.sendMessage(fromId, resp);
  });

// Any kind of message
bot.on('message', function (message) {
  // console.log(message);
  if (message.date * 1000 < freshDate) return false;
  actions.forEach(function (action) {
    if (action.test(message)) {
      action.doAction(message);
    }
  });

  return false;
});
