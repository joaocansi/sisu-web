'use client';

import search from '@/actions/search';
import { FormikContextType, useFormik } from 'formik';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type DynamicSearchKeyValue = {
  key: number;
  value: string;
};

type FormikValuesType = {
  co_curso: DynamicSearchKeyValue | null;
  co_ies_uf_localizacao: DynamicSearchKeyValue | null;
  co_ies_localizacao: DynamicSearchKeyValue | null;
  co_ies: DynamicSearchKeyValue | null;
  co_campus: DynamicSearchKeyValue | null;
};

type DynamicSearchProps = {
  formik: FormikContextType<FormikValuesType>;
  data: {
    co_curso: DynamicSearchKeyValue[];
    co_ies_uf_localizacao: DynamicSearchKeyValue[];
    co_ies_localizacao: DynamicSearchKeyValue[];
    co_ies: DynamicSearchKeyValue[];
    co_campus: DynamicSearchKeyValue[];
  };
  loading: {
    co_curso: boolean;
    co_ies_uf_localizacao: boolean;
    co_ies_localizacao: boolean;
    co_ies: boolean;
    co_campus: boolean;
  };
  disabled: {
    co_curso: boolean;
    co_ies_uf_localizacao: boolean;
    co_ies_localizacao: boolean;
    co_ies: boolean;
    co_campus: boolean;
  };
  onOpenAutocomplete: (name: DynamicSearchFields) => Promise<void>;
  onChangeAutocomplete: (
    field: DynamicSearchFields,
    value: DynamicSearchKeyValue | null,
  ) => void;
};

export type DynamicSearchFields =
  | 'co_curso'
  | 'co_ies_uf_localizacao'
  | 'co_ies_localizacao'
  | 'co_ies'
  | 'co_campus';

const DynamicSearchContext = createContext({} as DynamicSearchProps);
export function DynamicSearchProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState({
    co_curso: [],
    co_ies_uf_localizacao: [],
    co_ies_localizacao: [],
    co_ies: [],
    co_campus: [],
  });

  const [loading, setLoading] = useState({
    co_curso: false,
    co_ies_uf_localizacao: false,
    co_ies_localizacao: false,
    co_ies: false,
    co_campus: false,
  });

  const [disabled, setDisabled] = useState({
    co_curso: false,
    co_ies_uf_localizacao: true,
    co_ies_localizacao: true,
    co_ies: true,
    co_campus: true,
  });

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      co_curso: null,
      co_ies_uf_localizacao: null,
      co_ies_localizacao: null,
      co_ies: null,
      co_campus: null,
    },
    onSubmit: () => {},
  });

  const onOpenAutocomplete = useCallback(
    async (name: DynamicSearchFields) => {
      setLoading((prevLoading) => ({
        ...prevLoading,
        [name]: true,
      }));
      const seachedData = await search({
        field: name,
        where: formik.values,
      });
      setLoading((prevLoading) => ({
        ...prevLoading,
        [name]: false,
      }));
      setData((prevData) => ({
        ...prevData,
        [name]: seachedData,
      }));
    },
    [formik.values],
  );

  const onChangeAutocomplete = useCallback(
    (field: DynamicSearchFields, value: DynamicSearchKeyValue | null) => {
      if (field === 'co_campus') {
        if (value?.key) {
          setDisabled((prevDisabled) => ({
            ...prevDisabled,
            co_ies: true,
            co_ies_localizacao: true,
            co_ies_uf_localizacao: true,
          }));
        } else {
          setDisabled((prevDisabled) => ({
            ...prevDisabled,
            co_ies: false,
            co_ies_localizacao: false,
            co_ies_uf_localizacao: false,
          }));
        }
      }

      if (field === 'co_ies_localizacao') {
        if (value?.key) {
          setDisabled((prevDisabled) => ({
            ...prevDisabled,
            co_ies_uf_localizacao: true,
          }));
        } else {
          setDisabled((prevDisabled) => ({
            ...prevDisabled,
            co_ies_uf_localizacao: false,
          }));
        }
      }

      if (field === 'co_ies') {
        if (value?.key) {
          setDisabled((prevDisabled) => ({
            ...prevDisabled,
            co_ies_uf_localizacao: true,
            co_ies_localizacao: true,
          }));
        } else {
          setDisabled((prevDisabled) => ({
            ...prevDisabled,
            co_ies_uf_localizacao: false,
            co_ies_localizacao: false,
          }));
        }
      }

      if (field === 'co_curso') {
        if (value?.key) {
          formik.setValues((prev) => ({
            ...prev,
            co_campus: null,
            co_ies: null,
            co_ies_localizacao: null,
            co_ies_uf_localizacao: null,
          }));
          setDisabled((prevDisabled) => ({
            ...prevDisabled,
            co_campus: false,
            co_ies: false,
            co_ies_localizacao: false,
            co_ies_uf_localizacao: false,
          }));
        } else {
          setDisabled((prevDisabled) => ({
            ...prevDisabled,
            co_campus: false,
            co_ies: false,
            co_ies_localizacao: false,
            co_ies_uf_localizacao: false,
          }));
        }
      }

      formik.setFieldValue(field, value);
    },
    [formik],
  );

  const value = useMemo(
    () => ({
      formik,
      loading,
      data,
      onOpenAutocomplete,
      onChangeAutocomplete,
      disabled,
    }),
    [formik, loading, data, onOpenAutocomplete, onChangeAutocomplete, disabled],
  );

  return (
    <DynamicSearchContext.Provider value={value}>
      {children}
    </DynamicSearchContext.Provider>
  );
}

export const useDynamicSearch = () => useContext(DynamicSearchContext);
