
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

  it('renders a boolean value correctly', () => {
    const wrapper = shallow(<ReturnValue value={true}/>);

    expect(wrapper.find('.ReturnValue--boolean')).toHaveLength(1);
  });

  it('renders a string value correctly', () => {
    const wrapper = shallow(<ReturnValue value={"A"}/>);

    expect(wrapper.find('.ReturnValue--string')).toHaveLength(1);
  });

  it('renders a number value correctly', () => {
    const wrapper = shallow(<ReturnValue value={0}/>);

    expect(wrapper.find('.ReturnValue--number')).toHaveLength(1);
  });
});