import { createContext, useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "./App.css";

import Container from "./components/container";
import { FireMission } from "./components/fireMission";


dayjs.extend(relativeTime);

interface IFireMissionCtx {
   arr: FireMission[];
   setArr: (arr: FireMission[]) => void;
}
export const Ctx = createContext<IFireMissionCtx>({
   arr: [],
   setArr: (_) => {},
});

// export const Ctx = createContext<FireMission[]>([]);

function App() {
   const [arr, setArr] = useState<FireMission[]>([]);

   arr.push({
      target: "somewhere in the woods of Finland",
      flightTimeMinutes: 1,
      flightTimeSeconds: 39,
      shellType: "HE",
      shellCount: 5,
      splashTime: dayjs("2023-12-03T21:27")
         .add(1, "minutes")
         .add(39, "seconds"),
   });

   return (
      <Ctx.Provider value={{ arr, setArr }}>
         <Container />
      </Ctx.Provider>
   );
}
export default App;

/*
function Component() {
   const fmCtx = useContext(Ctx);

   useEffect(() => {
      // setTimeout(() => setArr((a:any) => [...a, 1]), 2000);
      fmCtx.arr.push({
         flightTimeMinutes: 1,
         flightTimeSeconds: 39,
         shellType: "HE",
         shellCount: 5,
         splashTime: dayjs().add(1, "minutes").add(39, "seconds"),
      });
   }, []);

   return <NewFireMission {...fmCtx.arr[0]} />;
}


   return (
      // set current time globally so that we can calculate the splash time
      // select HE || SMOKE via radio group
      // input a time in minutes + seconds (time from shot to splash)
      //     use a date-picker? https://mui.com/x/react-date-pickers/getting-started/
      //     do minus 5-10s to account for time required to switch from main pc to laptop?
      //     Add "development" time for smoke as well on splashdown

      // render creation menu button and the list of timers
      // display a mui "progress" component for each timer 
   );
*/
