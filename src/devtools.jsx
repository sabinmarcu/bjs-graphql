/* eslint-disable global-require */

if (process.env.NODE_ENV === 'development') {
  module.exports = require('mobx-react-devtools').default;
} else {
  module.exports = null;
}
