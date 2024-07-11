import {useContext, useState} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';

import { TimeCtx } from '../App';

interface SetTimeDialogProps {
   open: boolean;
   set: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SetTimeDialog(props: SetTimeDialogProps) {
   const timeCtx = useContext(TimeCtx);
   const [localDateTime, setLocalDateTime] = useState<Dayjs | null>(dayjs());
   const { open, set: setOpen } = props;

   const handleClose = () => {
      setOpen(false);
   };

   const handleClickSetTime = () => {
      timeCtx.setDateTime(localDateTime);
      
      console.log("new mission time:", localDateTime?.format("HH:mm:ss"));
      
      setOpen(false);
   }

   return (
      <Dialog
         fullWidth={true}
         open={open}
         onClose={handleClose}
         aria-labelledby="responsive-dialog-title"
      >
         <DialogTitle id="responsive-dialog-title">
            {"Set mission time"}
         </DialogTitle>

         <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MultiSectionDigitalClock
               value={localDateTime}
               views={['hours', 'minutes', 'seconds']}
               defaultValue={dayjs()}
               ampm={false}
               timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
               onChange={(newValue: Dayjs | null) => {
                  setLocalDateTime(newValue);
                  console.log("new selection time:", newValue?.format("HH:mm:ss"));
               }}
            />
            </LocalizationProvider>

         <DialogActions>
            <Button
               onClick={handleClickSetTime}
               endIcon={<ScheduleSendIcon />}
               variant="contained"
               color="success"
            >
               Set Mission Time
            </Button>
         </DialogActions>
         </DialogContent>
      </Dialog>

   )
}
