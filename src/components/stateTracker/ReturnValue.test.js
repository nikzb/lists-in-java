
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ReturnValue from './ReturnValue';

configure({ adapter: new Adapter() });

describe('<ReturnValue />', () => {
  it('renders a `.ReturnValue__container`', () => {
    const wrapper = shallow(<ReturnValue />);

    expect(wrapper.find('.ReturnValue__container')).toHaveLength(1);
  });
});