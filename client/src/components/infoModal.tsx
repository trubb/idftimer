import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
   position: 'absolute' as 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};

interface InfoModalProps {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InfoModal(props: InfoModalProps) {
   const { open, setOpen } = props;

   const handleClose = () => setOpen(false);

   return (
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               Trubb's Indirect Fire Timer
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
               I needed a way to keep track of firemissions in Arma 3.
               <br/>
               <a href="https://github.com/trubb/idftimer" target='blank'>The source code is hosted on GitHub.</a>
            </Typography>
         </Box>
      </Modal>
   );
}

