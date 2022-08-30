import React, { useMemo } from 'react';

import StyledTableRow from '@/components/StyledTableRow';
import StyledTableCell from '@/components/StyledTableCell';

import { useExchangeRate } from '@/features/exchange-rate';

// import useBybitPrice from '../hooks/useBybitPrice';
// import useUpbitPrice from '../hooks/useUpbitPrice';

import calculatePremium from '../utils/calculatePremium';

function KimpItem({ coin }) {
  // const { data: koreaPrice } = useUpbitPrice({ ticker });
  // const { data: foreignPrice } = useBybitPrice({ ticker });
  const { ticker, upbit: koreaPrice, bybit: foreignPrice } = coin;

  const { data: exchangeRate } = useExchangeRate();

  const premium = useMemo(
    () => calculatePremium({ koreaPrice, foreignPrice, exchangeRate }),
    [koreaPrice, foreignPrice, exchangeRate],
  );

  return (
    <StyledTableRow>
      <StyledTableCell>{ticker}</StyledTableCell>
      <StyledTableCell align="right">
        {foreignPrice && foreignPrice.toLocaleString()}
      </StyledTableCell>
      <StyledTableCell align="right">
        {koreaPrice && koreaPrice.toLocaleString()}
      </StyledTableCell>
      <StyledTableCell align="right">
        {premium && `${premium} %`}
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default React.memo(KimpItem);
