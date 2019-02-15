import "antd/dist/antd.css";
import './App.css';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import DogApp from './DogApp';


class App extends Component {
  render() {
    return (
      <Provider store={store()}>
        <DogApp /> 
      </Provider>
    );
  }
}

export default App;
