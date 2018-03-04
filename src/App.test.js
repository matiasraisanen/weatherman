import React from 'react';
import expect from 'expect';
import App from './App';
import { shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Weatherman', () => {

  it('renders without crashing', () => {
    expect(
      shallow
        (<App />)
        .length)
        .toEqual(1);
  });

  it('has division for the weather data', () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper
      .find('div')
      .at(1)
      .hasClass('weatherdata')
    ).toEqual(true);
  });

  it('has division for saved searches', () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper
      .find('div')
      .at(3)
      .hasClass('allSaved')
    ).toEqual(true);
  });

  it('has one text box for user input', () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper
      .find('input')
      .hasClass('userInput')
    ).toEqual(true);
  });

  it('has Get Weather button in first place', () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper
      .find('button')
      .at(0)
      .hasClass('getWeather')
    ).toEqual(true);
  });

  it('has Save City button in second place', () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper
      .find('button')
      .at(1)
      .hasClass('saveCity')
    ).toEqual(true);
  });

  it('has Clear button in third place', () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper
      .find('button')
      .at(2)
      .hasClass('clear')
    ).toEqual(true);
  });





});
