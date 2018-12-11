import React from 'react';
import ReactDOM from 'react-dom';
import SpotCity from './SpotCity';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import configureStore from './configureStore';

export const store = configureStore();

ReactDOM.render(<Provider store={store}><SpotCity /></Provider>, document.getElementById('root'));
registerServiceWorker();
