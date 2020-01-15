import AdminAction from './AdminAction'
import RepostAction from './RepostAction'
import PrivateMessageAction from './PrivateMessageAction'
import DeanonAction from './DeanonAction'
import InitAction from './InitAction'
import PlacesAction from './PlacesAction';
import CatsAction from './CatsAction';
import AntonsAction from './AntonsAction';
import AzazaAction from './AzazaAction';
import BayanAction from './BayanAction';
import BoobsAction from './BoobsAction';
import BratanAction from './BratanAction';
import BratishkaAction from './BratishkaAction';
import CounterAction from './CounterAction';
import FerretAction from './FerretAction';
import MobxAction from './MobxAction';
import GayAction from './GayAction';
import OkAction from './OkAction';
import PolundraAction from './PolundraAction';
// import SatanAction from './SatanAction';
import TodayAction from './TodayAction';
import TuesdayAction from './TuesdayAction';
import WinAction from './WinAction';

const actionClasses = [
  AdminAction,
  InitAction,
  RepostAction,
  PrivateMessageAction,
  DeanonAction,
  PlacesAction,
  CatsAction,
  AntonsAction,
  AzazaAction,
  BayanAction,
  BoobsAction,
  BratanAction,
  BratishkaAction,
  CounterAction,
  FerretAction,
  GayAction,
  MobxAction,
  OkAction,
  PolundraAction,
  // SatanAction,
  TodayAction,
  TuesdayAction,
  WinAction,
];

export default ({bot}) => actionClasses.map((ActionClass) => {
  return new ActionClass(bot);
});