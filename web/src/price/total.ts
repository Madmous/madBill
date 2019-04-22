import { Item } from '../app/Form';

import { calculateAmount } from './amount';

export const calculateTotal = (items: Item[]): number =>
  items.reduce((acc, item) => acc + Number(calculateAmount(item)), 0);
