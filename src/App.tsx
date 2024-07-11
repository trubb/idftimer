import { createContext, useState, Dispatch } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "./App.css";
import Container from "./components/container";
import { FireMission } from "./components/fireMission";


dayjs.extend(relativeTime);

interface IFireMissionCtx {
   arr: FireMission[];
   setArr: Dispatch<React.SetStateAction<FireMission[]>>;
}
export const FireMissionCtx = createContext<IFireMissionCtx>({
   arr: [],
   setArr: (_) => [],
});

interface StandardTime {
   dateTime: dayjs.Dayjs | null;
   setDateTime: Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
}
export const TimeCtx = createContext<StandardTime>({
   dateTime: dayjs(),
   setDateTime: (_) => dayjs.Dayjs,
});

function App() {
   const [arr, setArr] = useState<FireMission[]>([]);

   return (
      <TimeCtx.Provider value={{ dateTime: dayjs(), setDateTime: (_) => dayjs() }}>
         <FireMissionCtx.Provider value={{ arr, setArr }}>
            <Container />
         </FireMissionCtx.Provider>
      </TimeCtx.Provider>
   );
}
export default App;

// TODO set a global time that we base all other time on, to reflect ingame time
// TODO make use of that

// TODO play sound when timer reaches (nears) 0

/*
   set current time globally so that we can calculate the splash time
   select HE || SMOKE via radio group
   input a time in minutes + seconds (time from shot to splash)
       use a date-picker? https://mui.com/x/react-date-pickers/getting-started/
       do minus 5-10s to account for time required to switch from main pc to laptop?
       Add "development" time for smoke as well on splashdown

   render creation menu button and the list of timers
   display a mui "progress" component for each timer 
*/
