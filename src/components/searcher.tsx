'use client';

import { Search } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useDynamicSearch } from '@/contexts/dynamic-search';
import DynamicSearchAutocomplete from './dynamic-search-autocomplete';

export type SearchKeyValue = {
  key: number;
  value: string;
};

export default function Searcher() {
  const { formik } = useDynamicSearch();

  return (
    <Box mt={2}>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" gap={1}>
          <DynamicSearchAutocomplete name="co_curso" label="Curso" />
          <DynamicSearchAutocomplete
            name="co_ies_uf_localizacao"
            label="Estado"
          />
          <DynamicSearchAutocomplete name="co_ies_localizacao" label="Cidade" />
        </Box>
        <Box display="flex" gap={1} mt={1}>
          <DynamicSearchAutocomplete name="co_ies" label="Universidade" />
          <DynamicSearchAutocomplete name="co_campus" label="Campus" />
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
