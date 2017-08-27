require('isomorphic-fetch');

var UPDATE_SCORES_ENDPOINT = 'https://vote-webhook-jgnwkatoqk.now.sh';

module.exports = function(cb) {
  return fetch(UPDATE_SCORES_ENDPOINT).then(function(response) { cb(null, 'success') });
}
