import { useFormContext, Controller, useForm } from 'react-hook-form';
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Stack,
  Button,
  Typography,
  styled,
} from '@mui/material';
import { useContext, useEffect, useState, Component } from 'react';
import { FormContext } from '../../pages/HomePage';
import { Check } from '@mui/icons-material';

const StyledFCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

function FMultiCheckbox({ name, options, getOptionLabel, ...other }) {
  const { control, setValue } = useFormContext();

  const { filters, setFilters } = useContext(FormContext);

  useEffect(() => {
    setValue(name, filters[name]);
  }, [filters, name, setValue]);

  const handleOptionSelect = option => {
    const updatedFilters = filters[name].includes(option)
      ? filters[name].filter(item => item !== option)
      : [...filters[name], option];
    setFilters({ ...filters, [name]: updatedFilters });
  };

  const handleCheckAll = () => {
    const updatedFilters =
      filters[name].length !== options.length ? options : [];

    setFilters({ ...filters, [name]: updatedFilters });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormGroup
            sx={{
              fontWeight: 600,
              fontSize: { xs: '11px', sm: '14px' },
              width: 1,
              padding: 0,
              paddingLeft: { xs: 0, sm: 1 },
            }}
          >
            <Button onClick={handleCheckAll} sx={{ width: 1 }}>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: '11px', sm: '16px' } }}
              >
                Checks | Unchecks All
              </Typography>
            </Button>

            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                control={
                  <StyledFCheckbox
                    size="14px"
                    checked={field.value.includes(option)}
                    onChange={() => handleOptionSelect(option)}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: '10px', sm: '12px', md: '20px' },
                    }}
                  >
                    {getOptionLabel?.length ? getOptionLabel[index] : option}
                  </Typography>
                }
                {...other}
                sx={{
                  paddingLeft: {
                    xs: 0,
                    sm: 0,
                    md: 2,
                  },
                  width: '100%',
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}

export default FMultiCheckbox;
