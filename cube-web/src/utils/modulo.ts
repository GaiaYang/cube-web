/** 取正餘數 */
export default function modulo(a: number, b: number) {
  return ((a % b) + b) % b;
}
