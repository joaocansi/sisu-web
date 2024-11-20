import {
  DynamicSearchFields,
  DynamicSearchKeyValue,
  useDynamicSearch,
} from '@/contexts/dynamic-search';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

type DynamicSearchAutocompleteProps = {
  name: DynamicSearchFields;
  label: string;
};

export default function DynamicSearchAutocomplete({
  name,
  label,
}: DynamicSearchAutocompleteProps) {
  const {
    data,
    loading,
    formik,
    onOpenAutocomplete,
    onChangeAutocomplete,
    disabled,
  } = useDynamicSearch();

  return (
    <Autocomplete
      fullWidth
      onOpen={async () => onOpenAutocomplete(name)}
      options={data[name]}
      disabled={disabled[name]}
      value={formik.values[name]}
      getOptionLabel={(option: DynamicSearchKeyValue) => option.value}
      getOptionKey={(option: DynamicSearchKeyValue) => option.key}
      onChange={(_, a) => onChangeAutocomplete(name, a)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading[name] ? (
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
  );
}
