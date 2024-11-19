import { Profile, useProfile } from '@/contexts/profile';
import { Edit } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';

type EditProfileFormProps = {
  handleDialogClose: () => void;
};

const initialProfileValues = {
  nota_ch: 0,
  nota_cn: 0,
  nota_l: 0,
  nota_m: 0,
  nota_r: 0,
} as Profile;

export default function EditProfileForm({
  handleDialogClose,
}: EditProfileFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { profile, saveProfile } = useProfile();

  const onSubmit = async (values: Profile) => {
    await saveProfile(values);
    handleDialogClose();
    enqueueSnackbar('Perfil salvo com sucesso!', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };

  return (
    <Box mt={2}>
      <Formik
        initialValues={profile || initialProfileValues}
        onSubmit={onSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <Box display="flex" gap={1}>
              <TextField
                fullWidth
                type="number"
                name="nota_cn"
                label="Ciências da Natureza"
                value={values.nota_cn}
                onChange={handleChange}
                slotProps={{
                  htmlInput: {
                    step: '0.01',
                    max: 1000,
                    min: 0,
                  },
                }}
              />
              <TextField
                fullWidth
                name="nota_ch"
                type="number"
                label="Ciências Humanas"
                value={values.nota_ch}
                onChange={handleChange}
                slotProps={{
                  htmlInput: {
                    step: '0.01',
                    max: 1000,
                    min: 0,
                  },
                }}
              />
              <TextField
                fullWidth
                name="nota_l"
                type="number"
                label="Linguagens"
                value={values.nota_l}
                onChange={handleChange}
                slotProps={{
                  htmlInput: {
                    step: '0.01',
                    max: 1000,
                    min: 0,
                  },
                }}
              />
            </Box>
            <Box display="flex" gap={1} mt={1}>
              <TextField
                fullWidth
                name="nota_m"
                type="number"
                label="Matemática"
                value={values.nota_m}
                onChange={handleChange}
                slotProps={{
                  htmlInput: {
                    step: '0.01',
                    max: 1000,
                    min: 0,
                  },
                }}
              />
              <TextField
                fullWidth
                name="nota_r"
                type="number"
                label="Redação"
                value={values.nota_r}
                onChange={handleChange}
                slotProps={{
                  htmlInput: {
                    step: '0.01',
                    max: 1000,
                    min: 0,
                  },
                }}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Edit />}
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              Editar Perfil
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
