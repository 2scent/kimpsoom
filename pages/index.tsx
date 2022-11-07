import { Container } from '@mui/material';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import fetchExchangeRate from '@/shared/api/fetch-exchange-rate';

import { ExchangeRateContainer } from '@/features/exchange-rate';
import { KimpContainer, UpbitTickersContainer } from '@/features/kimp';

export default function HomePage() {
  return (
    <Container sx={{ mb: 10 }}>
      <h1>KIMPSOOM</h1>
      <ExchangeRateContainer />
      <UpbitTickersContainer />
      <KimpContainer />
    </Container>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['exchangeRate'], fetchExchangeRate);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
