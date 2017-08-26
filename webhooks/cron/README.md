Run the votes hook at some interval using [webtask cron](https://webtask.io/docs/cron), so top stories stay up to date.

#### Deploy

- Install [webtask cli](https://webtask.io)
- Replace the url in index.js with the url of your deployed vote hook (`../votes`)
- `wt cron schedule -n updateScoresCron 10m index.js` (replace 10m with whatever interval you want, 10m means every 10 minutes)
