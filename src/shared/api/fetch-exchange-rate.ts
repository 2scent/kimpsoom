export default async function fetchExchangeRate(): Promise<number> {
  // 이용 가능한 환율 API를 찾을 수 없어 임시 값으로 대체
  return 1360;
}
