import React, { useEffect, useState } from "react";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// Countdowner takes time as a prop and will display the time remaining until that time is reached.
export default function Countdowner(minutes: number, seconds: number): React.ReactElement {
   var totalSeconds = (minutes * 60) + seconds;
   const [timeLeft, setTimeLeft] = useState(totalSeconds);

   useEffect(() => {
      if (!timeLeft) {
         return;
      }

      const interval = setInterval(() => {
         setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(interval);
   }, [timeLeft]);

   if (timeLeft > 0) {
      return (
         <>
            {Math.floor(timeLeft / 60)}:{timeLeft % 60}
         </>
      );
   }

   return (      
      <Stack alignItems="center" direction="row" spacing={2}>
         <AlarmOnIcon/>
         <Typography variant="button">SPLASH!</Typography>
      </Stack>
   )
}
