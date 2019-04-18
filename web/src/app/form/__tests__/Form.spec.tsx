import React from 'react';
import { shallow } from 'enzyme';

import App from '../../App';

describe('Form', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
  
    expect(wrapper.find('div')).toBeDefined();
  });
});
