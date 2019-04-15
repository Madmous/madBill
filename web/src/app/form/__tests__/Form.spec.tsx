import React from 'react';
import { shallow } from 'enzyme';

import Form from '../Form';

it('renders without crashing', () => {
  const values = {
    from: '',
    billTo: '',
    shipTo: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    quantity: '',
    description: '',
    unitPrice: '',
    amount: '',
  };
  const wrapper = shallow(<Form values={values} handleChange={() => {}} setFieldTouched={() => {}} />);

  expect(wrapper.find('div')).toBeDefined();
});
