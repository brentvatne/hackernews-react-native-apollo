require('isomorphic-fetch');

module.exports = function(cb) {
  return fetch('https://vote-webhook-hrfwlkfoqm.now.sh').then(function(response) { cb(null, 'success') });
}
