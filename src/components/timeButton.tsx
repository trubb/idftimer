import {useState} from "react";
import Button from "@mui/material/Button";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import SetTimeDialog from "./setTimeDialog";

export default function TimeButton() {
   const [open, setOpen] = useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   }

   return (
      <>
         <Button
            color="secondary"
            variant="contained"
            onClick={handleClickOpen}
            startIcon={<MoreTimeIcon />}
            size="large"
         >
            Set Mission Time
         </Button>

         <SetTimeDialog open={open} set={setOpen} />
      </>
   );
}
