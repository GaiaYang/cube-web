/** 取正餘數 */
export default function modulo(n: number, m: number) {
  return ((n % m) + m) % m;
}
