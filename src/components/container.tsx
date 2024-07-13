import { useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import CreationButton from "./creationButton";
import TimeButton from "./timeButton";
import InfoButton from "./infoButton";
import { FireMissionCtx } from "../App";
import NewFireMission from "./fireMission";

export default function Container() {
   const fmCtx = useContext(FireMissionCtx);

   var fireMissions = fmCtx.arr.map((fm, idx) => {
      return (
         <NewFireMission
            key={idx}
            {...fm}
         />
      );
   });

   return (
      <Box
         sx={{
            "& > :not(style)": { m: 1 },
            bgcolor: "#123456",
            width: "95%",
            flexGrow: 1,
         }}
      >
         <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6} textAlign={"center"}>
               {<CreationButton />}
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
               {<TimeButton />}
            </Grid>
            <Grid item xs={2} textAlign={"center"}>
               {<InfoButton />}
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
                              Gun Type
                           </TableCell>
                           <TableCell sx={{ fontWeight: "bold" }}>
                              Shell Type
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
