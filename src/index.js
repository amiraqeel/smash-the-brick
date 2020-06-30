import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Intro from './js/Intro';
import * as serviceWorker from './js/serviceWorker';

//$(body).css("background-image", { brick });
ReactDOM.render(
  <Intro display="intro" />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
