/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import fetcher from '@/utils/fetcher';
import { Edit } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material';
import { Form, Formik } from 'formik';
import useSWR from 'swr';

// type EditProfileFormValuesType = {
//   nota_cn: number;
//   nota_ch: number;
//   nota_l: number;
//   nota_m: number;
//   nota_r: number;
//   nu_mod_concorrencia: string;
// };

export default function EditProfileForm() {
  const { data, isLoading, error } = useSWR(
    '/api/search?field=nu_mod_concorrencia',
    fetcher,
  );

  return (
    <Box mt={2}>
      <Formik
        initialValues={{
          nota_cn: 0,
          nota_ch: 0,
          nota_l: 0,
          nota_m: 0,
          nota_r: 0,
          nu_mod_concorrencia: '',
        }}
        onSubmit={async () => {}}
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
              />
              <TextField
                fullWidth
                name="nota_ch"
                type="number"
                label="Ciências Humanas"
                value={values.nota_ch}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                name="nota_l"
                type="number"
                label="Linguagens"
                value={values.nota_l}
                onChange={handleChange}
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
              />
              <TextField
                fullWidth
                name="nota_cn"
                type="number"
                label="Redação"
                value={values.nota_r}
                onChange={handleChange}
              />
            </Box>
            <Box mt={1}>
              <Autocomplete
                loading={isLoading}
                fullWidth
                getOptionLabel={(option: any) => option.nu_mod_concorrencia}
                getOptionKey={(option: any) => option.nu_mod_concorrencia}
                options={data && !error ? data : []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Modalidade de Concorrência"
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                )}
              />
            </Box>
            <Button
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
