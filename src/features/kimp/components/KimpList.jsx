import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

import StyledTableRow from '@/components/StyledTableRow';
import StyledTableCell from '@/components/StyledTableCell';

import useConnectBybit from '../hooks/useConnectBybit';
import useConnectUpbit from '../hooks/useConnectUpbit';

import KimpItem from './KimpItem';

function KimpList({ tickers }) {
  useConnectUpbit({ tickers });
  useConnectBybit({ tickers });

  return (
    <TableContainer component={Paper} sx={{ width: 650 }}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>코인</StyledTableCell>
            <StyledTableCell align="right">bybit($)</StyledTableCell>
            <StyledTableCell align="right">upbit(￦)</StyledTableCell>
            <StyledTableCell align="right">김치 프리미엄(%)</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {tickers.map((ticker) => (
            <KimpItem
              key={ticker}
              ticker={ticker}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default KimpList;
