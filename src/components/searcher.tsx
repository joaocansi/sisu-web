/* eslint-disable react/jsx-no-bind */

'use client';

import search from '@/actions/search';
import { Search } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';

export type SearchKeyValue = {
  key: number;
  value: string;
};

export default function Searcher() {
  const [cursos, setCursos] = useState<SearchKeyValue[]>([]);
  const [isCursosLoading, setIsCursosLoading] = useState(false);

  const [sgUfs, setSgUf] = useState<SearchKeyValue[]>([]);
  const [isSgUfLoading, setIsSgUfLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      no_curso: 0,
      sg_ies: 0,
      no_municipio: 0,
      no_ies: 0,
      no_campus: 0,
    },
    onSubmit: () => {},
  });

  async function handleCursoAutocompleteOpen() {
    setIsCursosLoading(true);
    const data = await search({
      field: 'no_curso',
      where: formik.values,
    });
    setIsCursosLoading(false);
    setCursos(data);
  }

  async function handleSgUfAutocompleteOpen() {
    setIsSgUfLoading(true);
    const data = await search({
      field: 'sg_uf',
      where: formik.values,
    });
    setIsSgUfLoading(false);
    setSgUf(data);
  }

  return (
    <Box mt={2}>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" gap={1}>
          <Autocomplete
            fullWidth
            onOpen={handleCursoAutocompleteOpen}
            options={cursos}
            getOptionLabel={(option: SearchKeyValue) => option.value}
            onChange={(_, a) => formik.setFieldValue('no_curso', a?.key)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Curso"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isCursosLoading ? (
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
          <Autocomplete
            fullWidth
            onOpen={handleSgUfAutocompleteOpen}
            options={sgUfs}
            getOptionLabel={(option: SearchKeyValue) => option.value}
            onChange={(_, a) => formik.setFieldValue('sg_uf', a?.key)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Estado"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isSgUfLoading ? (
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
