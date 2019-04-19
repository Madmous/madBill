import React from 'react';
import { shallow } from 'enzyme';

import Field, { Props } from '../Field';

describe('Field', () => {
  it('renders without crashing', () => {
    const props = informationProps({});
    const wrapper = shallow(<Field {...props} />);

    expect(wrapper.find('#from')).toHaveLength(1);
  });

  it('helper text should not be filled when the user types', () => {
    const props = informationProps({ value: 'D', touched: true });
    const wrapper = shallow(<Field {...props} />);
    const allProps: any = wrapper.find('#from').props();

    expect(allProps.helperText).toEqual('');
  });

  it('helper text should be filled when the user clears a field already filled', () => {
    const props = informationProps({ value: '', touched: true, error: 'Field cannot be empty' });
    const wrapper = shallow(<Field {...props} />);
    const allProps: any = wrapper.find('#from').props();

    expect(allProps.helperText).toEqual('Field cannot be empty');
  });
});

const informationProps = (props: Partial<Props>): Props => {
  const defaultProps: Props = {
    id: 'from',
    label: 'From',
    value: 'Dakar',
    handleChange: () => () => {},
  };

  return {
    ...defaultProps,
    ...props,
  };
};
