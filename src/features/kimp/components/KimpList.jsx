import useConnectBybit from '../hooks/useConnectBybit';
import useConnectUpbit from '../hooks/useConnectUpbit';

import KimpItem from './KimpItem';

function KimpList({ tickers }) {
  useConnectUpbit({ tickers });
  useConnectBybit({ tickers });

  return (
    <ul>
      {tickers.map((ticker) => (
        <KimpItem
          key={ticker}
          ticker={ticker}
        />
      ))}
    </ul>
  );
}

export default KimpList;
