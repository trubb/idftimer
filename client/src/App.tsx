import { createContext, useState, Dispatch } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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
   const [dateTime, setDateTime] = useState<dayjs.Dayjs | null>(dayjs());

   return (
      <TimeCtx.Provider value={{ dateTime, setDateTime }}>
         <FireMissionCtx.Provider value={{ arr, setArr }}>
            <Container />
         </FireMissionCtx.Provider>
      </TimeCtx.Provider>
   );
}
export default App;
