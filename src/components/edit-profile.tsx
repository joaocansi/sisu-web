'use client';

import { Button, Dialog, DialogContent, Typography } from '@mui/material';
import { useState } from 'react';
import EditProfileForm from './edit-profile-form';
import EditProfileAlert from './edit-profile-alert';

function EditProfile() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <EditProfileAlert />
      <Button
        fullWidth
        variant="outlined"
        color="success"
        size="large"
        onClick={handleOpen}
      >
        Editar Perfil
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="profile-dialog-title"
        aria-describedby="profile-dialog-description"
      >
        <DialogContent sx={{ p: 2 }}>
          <Typography id="profile-dialog-title" variant="h5" fontWeight={900}>
            Perfil
          </Typography>

          <Typography id="profile-dialog-description">
            Preencha os espaços abaixo com os dados requisitados. Os dados serão
            armazenados no browser, portanto, não altere nenhuma informação.
          </Typography>

          <EditProfileForm handleDialogClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditProfile;
