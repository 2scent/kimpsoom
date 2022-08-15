import BybitCoins from './BybitCoins';
import ExchangeRate from './ExchangeRate';
// import UpbitCoins from './UpbitCoins';

export default function App() {
  return (
    <>
      <h1>KIMPSOOM</h1>
      <ExchangeRate />
      {/* <UpbitCoins /> */}
      <BybitCoins />
    </>
  );
}
