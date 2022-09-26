import { styled, TableSortLabel, tableSortLabelClasses } from '@mui/material';

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  [`&.${tableSortLabelClasses.root}`]: {
    color: theme.palette.common.white,

    [`& .${tableSortLabelClasses.icon}`]: {
      color: theme.palette.common.white,
    },
  },
}));

export default StyledTableSortLabel;
