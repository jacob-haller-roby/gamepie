React = require('react')
React.addons = {}
React.addons.update = require('react-addons-update')
ReactCSSTransitionGroup = require('react-addons-css-transition-group')
ReactDOM = require('react-dom');
Provider =  require('react-redux');
Redux = require('redux');
MaterialUi = require('material-ui/lib');

ThemeManager = require('material-ui/lib/styles/theme-manager');
Theme = require('./theme.js');
injectTapEventPlugin = require('react-tap-event-plugin'); injectTapEventPlugin();

require('babel-polyfill');