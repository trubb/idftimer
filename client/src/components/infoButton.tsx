import {useState} from "react";
import Button from "@mui/material/Button";
import {InfoOutlined} from "@mui/icons-material";

import InfoModal from "./infoModal";

export default function InfoButton() {
   const [open, setOpen] = useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   }

   return (
      <>
         <Button
            color="info"
            variant="contained"
            onClick={handleClickOpen}
            startIcon={<InfoOutlined />}
            size="large"
         >
            About
         </Button>

         <InfoModal open={open} setOpen={setOpen} />
      </>
   );
}
