import { useFormContext, Controller } from 'react-hook-form';
import {
  Radio,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';
import { useContext } from 'react';
import { FormContext } from '../../pages/HomePage';

function FRadioGroup({ name, options, getOptionLabel, ...other }) {
  const { control } = useFormContext();
  const { filters, setFilters, handleFilterSelection } =
    useContext(FormContext);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup {...field} row {...other}>
            {options.map((option, index) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={getOptionLabel?.length ? getOptionLabel[index] : option}
                onClick={() => {
                  handleFilterSelection(name, option);
                }}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}

export default FRadioGroup;
