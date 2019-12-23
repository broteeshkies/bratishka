import RepostAction from './RepostAction'
import PrivateMessageAction from './PrivateMessageAction'
import DeanonAction from './DeanonAction'
import InitAction from './InitAction'


const actionClasses = [
  InitAction,
  RepostAction,
  PrivateMessageAction,
  DeanonAction,
  require('./antons').default,
  require('./odnoklassniki').default,
  require('./bratishka').default,
  require('./azazaz').default,
  require('./bayan').default,
  require('./tuesday').default,
  require('./bratbratan').default,
  require('./counter').default,
  require('./mobx').default,
  require('./boobs').default,
  require('./today').default,
  require('./win').default,
  require('./gay').default,
  require('./cats').default,
  require('./ferret').default,
  // Сколько это можно терпеть?!
  // require('./satan').default,
  require('./places').default,
  require('./polundra').default,
];

export default ({bot}) => actionClasses.map((ActionClass) => {
  return new ActionClass(bot);
});