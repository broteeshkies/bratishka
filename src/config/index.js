import config from '@lskjs/config';
import consts from './consts';
import chats from './chats';

export default config({
  log: {
    level: 'warn',
  },
  token: process.env.TOKEN,
  consts,
  chats,
});
