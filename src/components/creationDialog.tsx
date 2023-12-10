import React, { createContext, useEffect, useState, useContext } from "react";

import NewFireMission, { FireMission } from "./fireMission";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";

import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import InputAdornment from "@mui/material/InputAdornment";

import { Ctx } from "../App";
import { ContactlessOutlined, SolarPower } from "@mui/icons-material";

interface CreationDialogProps {
   open: boolean;
   set: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreationDialog(props: CreationDialogProps) {
   const fmCtx = useContext(Ctx);

   const { open, set: setOpen } = props;

   let [target, setTarget] = React.useState("");
   let [shellType, setShellType] = React.useState("HE");
   let [shellCount, setShellCount] = React.useState(0);
   let [minutes, setMinutes] = React.useState(0);
   let [seconds, setSeconds] = React.useState(0);
   let [checked, setChecked] = React.useState(true);

   const handleClose = () => {
      setOpen(false);
   };

   const handleClickEnqueue = () => {

      // TODO in here do the magic calculations to create the timer stuff

      console.log("enqueueing fire mission");
      var fm: FireMission = {
         target,
         shellType,
         shellCount,
         flightTimeMinutes: minutes,
         flightTimeSeconds: seconds,
      };
      console.log("fm in creationdialog: ", fm);

      var arr = fmCtx.arr;
      arr.push(fm);
      fmCtx.setArr(arr);

      setOpen(false);
   };

   const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
   };

   // TODO why values not updatera?
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
                     label="target"
                     defaultValue={""}
                     sx={{ maxWidth: "100%" }}
                     onChange={(e) => {
                        setTarget(e.target.value);
                     }}
                  />
               </Stack>

               <Stack direction="row" spacing={1} alignItems="center">
                  <FormLabel id="shell-type">Shell Type</FormLabel>
                  <Typography>Smoke</Typography>
                  <Switch
                     size="medium"
                     checked={checked}
                     onChange={() => {
                        // TODO fucking radio buttons rather???
                        setChecked(!checked);
                        setShellType(checked ? "HE" : "Smoke");
                        console.log("checked: ", checked);
                     }}
                     inputProps={{ "aria-label": "controlled" }}
                     color={checked ? "error" : "primary"}
                     value={checked ? "HE" : "Smoke"}
                  />
                  <Typography>HE</Typography>
               </Stack>

               <Stack direction="row" spacing={1} alignItems="center">
                  <FormLabel id="time">Shell count</FormLabel>
                  <TextField
                     id="outlined-basic"
                     variant="outlined"
                     label="shells"
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
                  />
               </Stack>

               <Stack direction="row" spacing={1} alignItems="center">
                  <FormLabel id="time">Time to splash</FormLabel>
                  <TextField
                     id="outlined-basic"
                     variant="outlined"
                     label="minutes"
                     defaultValue={0}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">min</InputAdornment>
                        ),
                     }}
                     onChange={(e) => {
                        setMinutes(parseInt(e.target.value));
                     }}
                  />
                  <TextField
                     id="outlined-basic"
                     variant="outlined"
                     label="seconds"
                     defaultValue={0}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">s</InputAdornment>
                        ),
                     }}
                     onChange={(e) => {
                        setSeconds(parseInt(e.target.value));
                     }}
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
