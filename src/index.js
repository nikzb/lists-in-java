import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import hideFocusRingExceptForTabbers from './handyScripts/hideFocusRingExceptForTabbers';

ReactDOM.render(<App />, document.getElementById('root'));
document.getElementById('root').style.minHeight = "100vh";
registerServiceWorker();
hideFocusRingExceptForTabbers();