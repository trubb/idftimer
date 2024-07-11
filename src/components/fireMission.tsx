import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; 
import utc from "dayjs/plugin/utc"; 
import duration from "dayjs/plugin/duration"

import Countdowner from "./countDowner";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(duration);

export interface FireMission {
   creationTime: dayjs.Dayjs | null;
   target: string
   flightTimeMinutes: number;
   flightTimeSeconds: number;
   shellType?: string;
   shellCount?: number;
   splashTime?: dayjs.Dayjs;
   remainingTime?: number;
}

export default function NewFireMission(fm: FireMission): React.ReactElement {
   var { flightTimeMinutes, flightTimeSeconds, creationTime } = fm;
   
   var splashTime = creationTime?.add(flightTimeMinutes, "minutes").add(flightTimeSeconds, "seconds");

   var remainingTime = Countdowner(flightTimeMinutes, flightTimeSeconds);

   return (
      <TableRow
         key={fm.target+fm.splashTime?.toString()}
         sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
         <TableCell component="th" scope="row" className="target">
               {fm.target}
            </TableCell>
         <TableCell component="th" scope="row" className="shelltype">
            {fm.shellType}
         </TableCell>
         <TableCell
            component="th"
            scope="row"
            className="shellcount"
            align="center"
         >
            {fm.shellCount}
         </TableCell>
         <TableCell align="center" className="remaining"
             sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: 'auto', textAlign: 'center'}}
         >
            {remainingTime}
         </TableCell>
         <TableCell align="center" id="splashtime">
            {splashTime?.format("HH:mm:ss")}
         </TableCell>
      </TableRow>
   );
}
