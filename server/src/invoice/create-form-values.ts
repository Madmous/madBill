import { FormValues } from './types';

export default (form: any): FormValues => {
  let total = 0;

  const items = form.items.map((item: any) => {
    const quantity = Number(item.quantity);
    const unitPrice = Number(item.unitPrice);
    const amount = quantity * unitPrice;

    total += amount;

    return {
      amount,
      description: item.description,
      quantity,
      unitPrice,
    };
  });

  return {
    ...form,
    items,
    total,
  };
};
