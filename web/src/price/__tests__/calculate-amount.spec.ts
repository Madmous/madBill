import { calculateAmount } from '../amount';

describe('amount', () => {
  it('should calculate the amount of an item', () => {
    const item = {
      amount: '1',
      description: 'pencil',
      quantity: '2',
      unitPrice: '150',
    };
    expect(calculateAmount(item)).toEqual('300');
  });
});
