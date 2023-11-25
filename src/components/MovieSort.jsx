import React, { useContext } from 'react';
import { FSelect } from './form';
import { FormContext } from '../pages/HomePage';

function MovieSort() {
  const { filters, setFilters, handleFilterSelection } =
    useContext(FormContext);

  return (
    <FSelect
      name="sortBy"
      label="Sort By"
      size="small"
      sx={{
        border: '1px solid blue',
        width: { xs: '100%', sm: '40%' },
        maxWidth: { xs: '100%', sm: '50%' },
      }}
      value={filters.sortBy}
      onChange={e => handleFilterSelection('sortBy', e.target.value)}
    >
      {[
        { value: 'popularity.desc', label: 'Popularity Descending' },
        { value: 'popularity.asc', label: 'Popularity Ascending' },
        { value: 'vote_average.desc', label: 'Rating Descending' },
        { value: 'vote_average.asc', label: 'Rating Ascending' },
      ].map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FSelect>
  );
}

export default MovieSort;
