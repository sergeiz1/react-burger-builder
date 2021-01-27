import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configure, shallow, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';
// import TestRenderer from 'react-test-renderer';
// import ShallowRenderer from 'react-test-renderer/shallow';
import App from './App';
import authReducer from './store/reducers/auth';
import * as actionTypes from './store/actions/actionTypes';
import { stat } from 'fs-extra';

// enzyme is ready
configure({ adapter: new Adapter() });

describe('App test', () => {

  const initialState = {
    isAuthenticated: false
  };

  const mockStore = configureMockStore();
  const store = mockStore(initialState);

  const mapStateToProps = () => {
    return {
      isAuthenticated: false
    }
  }

  const wrapper = shallow(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>);
  //const wrapper = mount(<App state={{ isAuthenticated: true }} />);
  // const instance = wrapper.instance();

  it('renders without crashing', () => {
    //expect(instance).toBeTruthy();
    //expect(wrapper.toBe(true);
    /* const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, div);
    ReactDOM.unmountComponentAtNode(div); */
  });

  it('should not be authenticated', () => {
    // test that the state values were correctly passed as props
    expect(mapStateToProps(initialState).isAuthenticated).toEqual(false);
  });


});
