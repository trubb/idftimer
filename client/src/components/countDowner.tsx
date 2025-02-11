import React, { useEffect, useState } from "react";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import CircularProgressWithLabel from "./progresser";

// Countdowner takes time as a prop and will display the time remaining until that time is reached.
export default function Countdowner(minutes: number, seconds: number): React.ReactElement {
   const totalSeconds = (minutes * 60) + seconds;
   const [timeLeft, setTimeLeft] = useState(totalSeconds);
   const [progress, setProgress] = useState(0);

   useEffect(() => {
      if (!timeLeft) {
         return;
      }

      const interval = setInterval(() => {
         setTimeLeft(timeLeft - 1);
         setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 100/totalSeconds));
      }, 1000);
      return () => {
         clearInterval(interval);
      };
   }, [timeLeft, totalSeconds]);

   if (timeLeft > 0) {
      return (
         <Stack alignItems="center" direction="row" spacing={2}>
         <Typography variant="button">{Math.floor(timeLeft / 60)}m:{timeLeft % 60}s</Typography>
         <CircularProgressWithLabel value={progress}/>
      </Stack>
      );
   }

   return (      
      <Stack alignItems="center" direction="row" spacing={2}>
         <AlarmOnIcon color={"success"}/>
         <Typography variant="button">SPLASH!</Typography>
      </Stack>
   )
}
