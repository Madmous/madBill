import { calculateTotal } from '../total';

describe('total', () => {
  it('should calculate the amount of all items', () => {
    const items = [
      { description: 'videos', quantity: '2', amount: '1', unitPrice: '150' },
      { description: 'recettes', quantity: '1', amount: '1', unitPrice: '50' },
    ];
    expect(calculateTotal(items)).toEqual(350);
  });
});
