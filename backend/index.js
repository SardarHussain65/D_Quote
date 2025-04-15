// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const twilio = require('twilio');

// const app = express(); // ✅ You forgot this line!
// app.use(cors());

// const AccessToken = twilio.jwt.AccessToken;
// const ChatGrant = AccessToken.ChatGrant;

// app.get('/token', (req, res) => {
//   const identity = req.query.identity;

//   const token = new AccessToken(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_API_KEY,
//     process.env.TWILIO_API_SECRET,
//     {identity},
//   );

//   const chatGrant = new ChatGrant({
//     serviceSid: process.env.TWILIO_CONVERSATIONS_SERVICE_SID,
//   });

//   token.addGrant(chatGrant);

//   res.send({
//     identity,
//     token: token.toJwt(),
//   });
// });

// app.listen(3000, () => console.log('Token server running on port 3000'));
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(cors());

// Validate environment variables
const requiredEnvVars = [
  'TWILIO_ACCOUNT_SID',
  'TWILIO_API_KEY',
  'TWILIO_API_SECRET',
  'TWILIO_CONVERSATIONS_SERVICE_SID',
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error(
    'Missing required environment variables:',
    missingEnvVars.join(', '),
  );
  process.exit(1);
}

const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({status: 'OK', message: 'Token server is running'});
});

// Token generation endpoint
app.get('/token', (req, res) => {
  const identity = req.query.identity;

  if (!identity) {
    console.error('Missing identity parameter in request');
    return res.status(400).json({error: 'Identity parameter is required'});
  }

  try {
    console.log(`Generating token for identity: ${identity}`);
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET,
      {identity, ttl: 3600},
    );

    const chatGrant = new ChatGrant({
      serviceSid: process.env.TWILIO_CONVERSATIONS_SERVICE_SID,
    });
    token.addGrant(chatGrant);

    const jwt = token.toJwt();
    console.log(`Token generated successfully for identity: ${identity}`);

    res.status(200).json({
      identity,
      token: jwt,
    });
  } catch (error) {
    console.error('Error generating token:', error.message);
    res
      .status(500)
      .json({error: 'Failed to generate token', details: error.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Token server running on port ${PORT}`);
  console.log('Environment variables:');
  console.log(
    `TWILIO_ACCOUNT_SID: ${process.env.TWILIO_ACCOUNT_SID.slice(0, 5)}...`,
  );
  console.log(`TWILIO_API_KEY: ${process.env.TWILIO_API_KEY.slice(0, 5)}...`);
  console.log(
    `TWILIO_CONVERSATIONS_SERVICE_SID: ${process.env.TWILIO_CONVERSATIONS_SERVICE_SID}`,
  );
});
