var React = require ('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');
const reactContainer = document.getElementById('mountNode');

ReactDOM.render(<App />,reactContainer)
