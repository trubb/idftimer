import {useState} from "react";
import Button from "@mui/material/Button";
import MoreTimeIcon from "@mui/icons-material/MoreTime";

import CreationDialog from "./creationDialog";

export default function CreationButton() {
   const [open, setOpen] = useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };

   return (
      <>
         <Button
            color="warning"
            variant="contained"
            onClick={handleClickOpen}
            startIcon={<MoreTimeIcon />}
            size="large"
         >
            New fire mission
         </Button>

        <CreationDialog open={open} setOpen={setOpen}/>
      </>
   );
}
