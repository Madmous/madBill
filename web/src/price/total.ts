import { Item } from '../app/Form';

export const calculateTotal = (items: Item[]): number =>
  items.reduce((acc, item) => acc + Number(item.quantity) * Number(item.unitPrice) * Number(item.amount) * 1.2, 0);
