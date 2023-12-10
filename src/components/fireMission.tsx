import React, { createContext, useEffect, useState, useContext } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";

import {Ctx} from "../App";

export interface FireMission {
   target: string
   flightTimeMinutes: number;
   flightTimeSeconds: number;
   shellType?: string;
   shellCount?: number;
   splashTime?: dayjs.Dayjs;
   remainingTime?: number;
}

// TODO make use of this instead of the var fireMissions in container
export default function NewFireMission(fm: FireMission): React.ReactElement {
   const fmCtx = useContext(Ctx);
   console.log(typeof fmCtx);

   var splashTime = dayjs(); // current time
   var { flightTimeMinutes, flightTimeSeconds } = fm;
   splashTime
      .add(flightTimeMinutes, "minutes")
      .add(flightTimeSeconds, "seconds");
   var remainingTime = splashTime.diff(dayjs(), "seconds");

   return (
      <TableRow
         key={fm.shellType}
         sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
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
         <TableCell align="center" className="remaining">
            {remainingTime}
         </TableCell>
         <TableCell align="center" id="splashtime">
            {splashTime.toString()}
         </TableCell>
      </TableRow>
   );
}
