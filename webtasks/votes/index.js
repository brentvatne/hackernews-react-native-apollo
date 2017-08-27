const { json } = require('micro');
const { request } = require('graphql-request');
const differenceInHours = require('date-fns/difference_in_hours');

const GRAPHCOOL_ENDPOINT =
  'https://api.graph.cool/simple/v1/cj6nypgtb224m0143b2gstire';

module.exports = async (req, res) => {
  let queryResponse = await request(GRAPHCOOL_ENDPOINT, recentLinksQuery);
  if (queryResponse.error) {
    throw new Error('Error fetching links');
  }

  let linksWithScores = calculateScores(queryResponse.allLinks);
  let mutationQuery = generateMutation(linksWithScores);
  let mutationResponse = await request(GRAPHCOOL_ENDPOINT, mutationQuery);
  if (mutationResponse.error) {
    throw new Error('Error updating links');
  }

  console.log('Updated scores:');
  console.log(linksWithScores);

  if (req.body) {
    // Don't modify the vote record
    const event = await json(req);
    return event.data;
  } else {
    return {};
  }
};

function calculateScores(links) {
  let now = new Date();
  return links.map(link => calculateScore(link, now));
}

function calculateScore(link, now) {
  let voteCount = link._votesMeta.count;
  let createdAt = new Date(link.createdAt);
  let hoursOld = differenceInHours(now, createdAt);

  let ageFactor = 1;
  if (hoursOld > 3 && hoursOld <= 6) {
    ageFactor = 0.9;
  } else if (hoursOld > 6 && hoursOld <= 12) {
    ageFactor = 0.8;
  } else if (hoursOld > 12 && hoursOld <= 24) {
    ageFactor = 0.5;
  } else if (hoursOld > 24 && hoursOld <= 48) {
    ageFactor = 0.2;
  } else if (hoursOld > 48 && hoursOld <= 72) {
    ageFactor = 0.05;
  } else if (hoursOld > 72) {
    ageFactor = 0.01;
  }

  return {
    id: link.id,
    score: Math.round(voteCount * ageFactor * 10),
    ageFactor,
  };
}

const generateMutation = links => `
  mutation UpdateScore {
    ${links.map(
      link => `
      ${link.id}: updateLink(id: "${link.id}", score: ${link.score}) {
        id
      }
    `
    )}
  }
`;

const recentLinksQuery = `
  query AllLinksQuery {
    allLinks(orderBy: createdAt_DESC, first: 100) {
      id
      score
      createdAt
      _votesMeta {
        count
      }
    }
  }
`;
