import { ExchangeRate } from './features/exchange-rate';
import { UpbitContainer } from './features/upbit';
import { BybitContainer } from './features/bybit';

export default function App() {
  return (
    <>
      <h1>KIMPSOOM</h1>
      <ExchangeRate />
      <UpbitContainer />
      <BybitContainer />
    </>
  );
}
