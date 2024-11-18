'use client';

import { Search } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';

export default function Searcher() {
  const formik = useFormik({
    initialValues: {
      no_curso: '',
      sg_ies: '',
      no_municipio: '',
      no_ies: '',
      no_campus: '',
    },
    onSubmit: () => {},
  });

  return (
    <Box mt={2}>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            type="text"
            name="no_curso"
            label="Curso"
            value={formik.values.no_curso}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            type="text"
            name="sg_ies"
            label="Estado"
            value={formik.values.sg_ies}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            type="text"
            name="no_municipio"
            label="Cidade"
            value={formik.values.no_municipio}
            onChange={formik.handleChange}
          />
        </Box>
        <Box display="flex" gap={1} mt={1}>
          <TextField
            fullWidth
            type="text"
            name="no_ies"
            label="Instituição"
            value={formik.values.no_ies}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            type="text"
            name="no_campus"
            label="Campus"
            value={formik.values.no_campus}
            onChange={formik.handleChange}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          startIcon={<Search />}
          fullWidth
          color="primary"
          size="large"
          sx={{ mt: 2 }}
        >
          Pesquisar
        </Button>
      </form>
    </Box>
  );
}
