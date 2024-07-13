import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";

import { FireMissionCtx, TimeCtx } from "../App";
import { FireMission } from "./fireMission";

interface CreationDialogProps {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreationDialog(props: CreationDialogProps) {
   const fmCtx = useContext(FireMissionCtx);
   const timeCtx = useContext(TimeCtx);

   const { open, setOpen } = props;

   let [shellTypeSwitch, setShellTypeSwitch] = useState(true);
   let [shellType, setShellType] = useState("HE");

   let [gunTypeSwitch, setGunTypeSwitch] = useState(true);
   let [gunType, setGunType] = useState("Mortar");

   let [target, setTarget] = useState("");
   let [targetError, setTargetError] = useState(false);

   let [shellCount, setShellCount] = useState(0);
   let [shellCountError, setShellCountError] = useState(false);

   let [minutes, setMinutes] = useState(0);
   let [minutesError, setMinutesError] = useState(false);

   let [seconds, setSeconds] = useState(0);
   let [secondsError, setSecondsError] = useState(false);

   const resetErrors = () => {
      setTargetError(false);
      setShellCountError(false);
      setMinutesError(false);
      setSecondsError(false);
   };

   const handleClose = () => {
      setOpen(false);
   };

   // create a new fire mission and add it to the fire mission context array
   const handleClickEnqueue = () => {
      if (!(typeof target === "string" && target.length > 0)) {
         setTargetError(true);
         return;
      }
      if (!(typeof shellCount === "number" && shellCount > 0)) {
         setShellCountError(true);
         return;
      }
      if (!(typeof minutes === "number" && minutes >= 0)) {
         setMinutesError(true);
         return;
      }
      if (minutes === 0 && !(typeof seconds === "number" && seconds > 0)) {
         setSecondsError(true);
         return;
      } else if (!(typeof seconds === "number" && seconds >= 0)) {
         setSecondsError(true);
         return;
      }
      if (minutes === 0 && seconds === 0) {
         setMinutesError(true);
         setSecondsError(true);
         return;
      }
      resetErrors();

      const fmTime = timeCtx.dateTime;

      const fm: FireMission = {
         creationTime: fmTime,
         target,
         gunType,
         shellType,
         shellCount,
         flightTimeMinutes: minutes,
         flightTimeSeconds: seconds,
         splashTime: fmTime?.add(minutes, "minutes").add(seconds, "seconds"),
      };

      console.log("new fire mission:", fm, "time", fmTime?.format("HH:mm:ss"));

      fmCtx.setArr((old: FireMission[]) => [...old, fm]);

      setOpen(false);
   };

   return (
      <Dialog
         fullWidth={true}
         open={open}
         onClose={handleClose}
         aria-labelledby="responsive-dialog-title"
      >
         <DialogTitle id="responsive-dialog-title">
            {"Creating new fire mission!"}
         </DialogTitle>

         <DialogContent>
            <FormControl>
               <Stack direction="row" spacing={1} alignItems="center">
                  <FormLabel id="time">Target</FormLabel>
                  <TextField
                     id="outlined-basic"
                     variant="outlined"
                     defaultValue={""}
                     sx={{ maxWidth: "100%" }}
                     onChange={(e) => {
                        setTarget(e.target.value);
                     }}
                     error={targetError}
                  />
               </Stack>

               <Stack direction="row" spacing={1} alignItems="center">
                  <FormLabel id="shell-type">Shell Type</FormLabel>
                  <Typography>Howitzer</Typography>
                  <Switch
                     size="medium"
                     checked={gunTypeSwitch}
                     onChange={() => {
                        setGunTypeSwitch(!gunTypeSwitch);
                        setGunType(gunTypeSwitch ? "Mortar" : "Howitzer");
                        console.log("gunTypeSwitch", gunTypeSwitch, "gunType", gunType);
                     }}
                     inputProps={{ "aria-label": "controlled" }}
                     color={gunTypeSwitch ? "error" : "primary"}
                     value={gunTypeSwitch ? "Mortar" : "Howitzer"}
                  />
                  <Typography>Mortar</Typography>
               </Stack>

               <Stack direction="row" spacing={1} alignItems="center">
                  <FormLabel id="shell-type">Shell Type</FormLabel>
                  <Typography>Smoke</Typography>
                  <Switch
                     size="medium"
                     checked={shellTypeSwitch}
                     onChange={() => {
                        setShellTypeSwitch(!shellTypeSwitch);
                        setShellType(shellTypeSwitch ? "HE" : "Smoke");
                     }}
                     inputProps={{ "aria-label": "controlled" }}
                     color={shellTypeSwitch ? "error" : "primary"}
                     value={shellTypeSwitch ? "HE" : "Smoke"}
                  />
                  <Typography>HE</Typography>
               </Stack>

               <Stack direction="row" spacing={1} alignItems="center" sx={{ margin: 1 }}>
                  <FormLabel id="time">Shell count</FormLabel>
                  <TextField
                     id="outlined-basic"
                     variant="outlined"
                     defaultValue={0}
                     sx={{ maxWidth: "100%" }}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              shells
                           </InputAdornment>
                        ),
                     }}
                     onChange={(e) => {
                        setShellCount(parseInt(e.target.value));
                     }}
                     error={shellCountError}
                  />
               </Stack>

               <Stack direction="row" spacing={1} alignItems="center" sx={{ margin: 1 }}>
                  <FormLabel id="time">Time to splash</FormLabel>
                  <TextField
                     id="outlined-basic"
                     variant="outlined"
                     defaultValue={0}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">min</InputAdornment>
                        ),
                     }}
                     onChange={(e) => {
                        setMinutes(parseInt(e.target.value));
                     }}
                     error={minutesError}
                  />
                  <TextField
                     id="outlined-basic"
                     variant="outlined"
                     defaultValue={0}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">s</InputAdornment>
                        ),
                     }}
                     onChange={(e) => {
                        setSeconds(parseInt(e.target.value));
                     }}
                     error={secondsError}
                  />
               </Stack>
            </FormControl>
         </DialogContent>

         <DialogActions>
            <Button
               autoFocus
               onClick={handleClickEnqueue}
               endIcon={<ScheduleSendIcon />}
               variant="contained"
               color="success"
            >
               Enqueue Fire Mission
            </Button>
         </DialogActions>
      </Dialog>
   );
}
