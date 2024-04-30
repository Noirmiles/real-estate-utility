import { Decimal } from '@prisma/client/runtime/library';


export function numberWithCommas(x: Decimal): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}