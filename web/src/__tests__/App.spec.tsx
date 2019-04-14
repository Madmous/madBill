import React from 'react';
import { shallow } from 'enzyme';

import App from '../app/App';

it('renders without crashing', () => {
  const wrapper = shallow(
    <App
      from={''}
      setFrom={() => {}}
      billTo={''}
      setBillTo={() => {}}
      shipTo={''}
      setShipTo={() => {}}
      invoiceNumber={''}
      setInvoiceNumber={() => {}}
      invoiceDate={''}
      setInvoiceDate={() => {}}
      dueDate={''}
      setDueDate={() => {}}
      quantity={''}
      setQuantity={() => {}}
      description={''}
      setDescription={() => {}}
      unitPrice={''}
      setUnitPrice={() => {}}
      amount={''}
      setAmount={() => {}}
    />
  );

  expect(wrapper.find('div')).toBeDefined();
});
