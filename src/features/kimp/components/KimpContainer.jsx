import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectCoins, selectSelectedTickers, setCoins } from '@/store/coinSlice';

import useUpbitTickers from '../hooks/useUpbitTickers';

import KimpNewList from './KimpNewList';

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
          <KimpNewList
            coins={coins}
          />
        )}
    </>
  );
}

export default KimpContainer;
