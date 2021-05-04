// import test from "./test";
import musicSNS from "./musicSNS";
import BABABA from "./BABABA";
import embedded from "./embedded";
import nodebook from "./nodebook";
import PredictiveMonitoring from "./PredictiveMonitoring";
import ReactBoard from "./ReactBoard";

const projects = [
  musicSNS,
  BABABA,
  embedded,
  nodebook,
  PredictiveMonitoring,
  ReactBoard,
]
  .reverse()
  .map((project, index) => {
    return { ...project, key: index + 1 };
  });

export default projects;
