import React from 'react';
import {BurgerBuilder} from './BurgerBuilder';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// enzyme is ready
configure({adapter: new Adapter()});

describe('BurgerBuilder test', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onIngredientsInit={() => {}}/>)
    })

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ingredients: {salad: 0}}); // {salad: 0} -> null
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});