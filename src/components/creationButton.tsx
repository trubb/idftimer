import * as React from "react";
import Button from "@mui/material/Button";
import MoreTimeIcon from "@mui/icons-material/MoreTime";

import CreationDialog from "./creationDialog";

export default function CreationMenu() {
   const [open, setOpen] = React.useState(false);

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

        <CreationDialog open={open} set={setOpen}/>
      </>
   );
}
