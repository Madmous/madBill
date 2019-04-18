import { calculateTotal } from '../calculate-total';

describe('calculate-total', () => {
  it('should take into account the tax', () => {
    const items = [{ description: 'pencil', quantity: '1', amount: '1', unitPrice: '1' }];
    expect(calculateTotal(items)).toEqual(1.2);
  });
});
