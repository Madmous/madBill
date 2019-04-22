import { Item } from '../app/Form';

export const calculateAmount = (item: Item): string =>
  String(Number(item.quantity) * Number(item.unitPrice));
