import { useDispatch, useSelector } from 'react-redux';

import { selectCoins, selectSelectedTickers, setCoins } from '@/store/coinSlice';

import { useEffect } from 'react';
import useUpbitTickers from '../hooks/useUpbitTickers';

import KimpList from './KimpList';

function KimpContainer() {
  const selectedTickers = useSelector(selectSelectedTickers);

  const coins = useSelector(selectCoins);

  const { isLoading } = useUpbitTickers({
    select: (data) => data.filter((ticker) => selectedTickers.includes(ticker)),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCoins(selectedTickers));
  }, [selectedTickers]);

  return (
    <>
      <h1>김프</h1>
      {isLoading
        ? <p>로딩 중</p>
        : (
          <KimpList
            coins={coins}
          />
        )}
    </>
  );
}

export default KimpContainer;
