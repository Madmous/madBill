import { shallow } from 'enzyme';
import React from 'react';

import ItemField, { Props } from '../ItemField';

describe('ItemField', () => {
  it('renders without crashing', () => {
    const props = informationProps({});
    const wrapper = shallow(<ItemField {...props} />);

    expect(wrapper.find({ label: props.label })).toHaveLength(1);
  });

  it('helper text should not be filled when the user types', () => {
    const props = informationProps({ value: 'D', touched: [{ description: true }] });
    const wrapper = shallow(<ItemField {...props} />);
    const allProps: any = wrapper.find({ label: props.label }).props();

    expect(allProps.error).toEqual(false);
    expect(allProps.helperText).toEqual('');
  });

  it('helper text should be filled when the user clears a field already filled', () => {
    const props = informationProps({
      errors: [{ description: 'Description cannot be empty' }],
      touched: [{ description: true }],
      value: '',
    });
    const wrapper = shallow(<ItemField {...props} />);
    const allProps: any = wrapper.find({ label: props.label }).props();

    expect(allProps.error).toEqual(true);
    expect(allProps.helperText).toEqual('Description cannot be empty');
  });
});

const informationProps = (props: Partial<Props>): Props => {
  const defaultProps: Props = {
    handleChange: () => () => {},
    id: 'description',
    index: 0,
    label: 'Description',
    value: 'Mango',
  };

  return {
    ...defaultProps,
    ...props,
  };
};
