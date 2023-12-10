import { createContext, useEffect, useState, useContext } from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CreationMenu from "./creationButton";

import NewFireMission, { FireMission } from "./fireMission";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Ctx } from "../App";

export default function Container() {
   const fmCtx = useContext(Ctx);

   var fireMissions = fmCtx.arr.map((fm) => {
      console.log("fm in make fire missions: ", fm);
      return (
         <TableRow key={fm.splashTime?.toString()}>
            <TableCell component="th" scope="row" className="target">
               {fm.target}
            </TableCell>
            <TableCell component="th" scope="row" className="shellType">
               {fm.shellType}
            </TableCell>
            <TableCell align="center" className="shellCount">
               {fm.shellCount}
            </TableCell>
            <TableCell align="center" className="timeRemaining">
               {fm.remainingTime}
            </TableCell>
            <TableCell align="center" className="splashTimeClock">
               {dayjs(fm.splashTime).format("HH:MM:ss").toString()}
            </TableCell>
         </TableRow>
      );
   });

   return (
      <Box
         sx={{
            "& > :not(style)": { m: 1 },
            bgcolor: "background.paper",
            width: "100%",
            flexGrow: 1,
         }}
      >
         <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} textAlign={"center"}>
               {<CreationMenu />}
            </Grid>
            <Grid item xs={12} textAlign={"center"}>
               <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                     <TableHead>
                        <TableRow>
                           <TableCell sx={{ fontWeight: "bold" }}>
                              Target
                           </TableCell>
                           <TableCell sx={{ fontWeight: "bold" }}>
                              Type
                           </TableCell>
                           <TableCell
                              sx={{ fontWeight: "bold" }}
                              align="center"
                           >
                              Shells
                           </TableCell>
                           <TableCell
                              sx={{ fontWeight: "bold" }}
                              align="center"
                           >
                              Time to splash
                           </TableCell>
                           <TableCell
                              sx={{ fontWeight: "bold" }}
                              align="center"
                           >
                              Splash time
                           </TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>{fireMissions}</TableBody>
                  </Table>
               </TableContainer>
            </Grid>
         </Grid>
      </Box>
   );
}
