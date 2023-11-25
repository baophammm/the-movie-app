import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { PaginationContext } from '../pages/HomePage';

export default function BasicPagination({
  page,
  handlePageChange,
  totalPages,
}) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages > 500 ? 500 : totalPages}
        color="primary"
        page={page}
        onChange={handlePageChange}
      />
    </Stack>
  );
}
