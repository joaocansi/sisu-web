'use client';

import search from '@/actions/search';
import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

type AutocompleteOption = {
  key: number;
  value: string;
};

export default function DynamicSearch() {
  const [coursesValues, setCoursesValues] = useState<AutocompleteOption[]>([]);
  const [isCoursesLoading, setIsCoursesLoading] = useState(false);
  const [courses, setCourses] = useState<AutocompleteOption[]>([]);

  useEffect(() => {
    (async () => {
      setIsCoursesLoading(true);
      const data: AutocompleteOption[] = await search('courses');
      setCourses(data);
      setIsCoursesLoading(false);
    })();
  }, []);

  return (
    <Box mt={2}>
      <form>
        <Autocomplete
          multiple
          options={courses}
          limitTags={2}
          onChange={(_, value) => {
            if (!value) setCoursesValues([]);
            else setCoursesValues(value);
          }}
          value={coursesValues}
          getOptionLabel={(option) => option.value}
          getOptionKey={(option) => option.key}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecione as opções de cursos"
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isCoursesLoading ? (
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
      </form>
    </Box>
  );
}
