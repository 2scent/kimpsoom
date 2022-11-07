export default function stableSort<T>(array: readonly T[], compareFn?: (a: T, b: T) => number) {
  return [...array].sort(compareFn);
}
