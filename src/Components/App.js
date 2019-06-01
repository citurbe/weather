import React from 'react';
import Search from './Search/Search';
import configureStore from '../Store/createStore';
import { Provider } from 'react-redux';
import Weather from './Weather/Weather';
import './App.css';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>How's the weather?</h1>
        </header>
        <Search />
        <Weather />
      </div>
    </Provider>
  );
}

export default App;
