var React = require ('react');
var ReactDOM = require('react-dom');
var Game = require('./components/Game');
const reactContainer = document.getElementById('mountNode');

ReactDOM.render(<Game gridSize = {5} challengeSize = {6} wrongsAllowed ={3} />,reactContainer)
