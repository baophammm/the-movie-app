import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext } from 'react';
import { FTextField, FormProvider } from './form';
import { FormContext } from '../pages/HomePage';
import { useForm } from 'react-hook-form';

const defaultValues = {
  searchQuery: '',
};

function MovieSearchForm() {
  const { filters, setFilters, handleFilterSelection } =
    useContext(FormContext);

  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  const onSubmit = async data => {
    console.log(data.searchQuery);
    handleFilterSelection('searchQuery', data.searchQuery);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FTextField
        name="searchQuery"
        label="Search"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </FormProvider>
  );
}

export default MovieSearchForm;
