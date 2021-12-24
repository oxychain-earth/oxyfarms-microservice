require('dotenv').config()

const express = require('express');
const MetaAuth = require("meta-auth");
const fs = require("fs");

const PORT = process.env.PORT || 7000

const app = express().set('port', PORT);

const metaAuth = new MetaAuth({
  banner: process.env.META_BANNER,
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', function(req, res) {
  res.send("OxyFarms microservice is running!");
})

// api serving contract-level metadata
app.get('/contract', function(req, res) {
  const data = {
    'name': 'OxyFarm-Genesis',
    'description': 'OxyFarms is creating a global decentralized forest by developing afforestation and reforestation projects around the world with a digital representation in the oxyverse. This is our very first venture, our first OxyFarm: "Genesis".',
    'image': `${process.env.IPFS_PATH}/QmbTPLkNwbkAUp4Bf6f23dLsQekntzAKV67fvVodAfQSnU`,
    'external_link': 'https://oxyfarms.earth'
  }
  res.send(data)
})

// api serving token-level metadata
app.get('/token/:token_id', function(req, res) {
  const token_id = req.params.token_id;

  const data = {
    'name': "NFTree #" + token_id.padStart(4, "0"),
    'description': `>OxyFarms is creating a global decentralized forest by developing afforestation and reforestation projects around the world with a digital representation in the oxyverse. This is our very first venture, our first OxyFarm: "Genesis".
    
		**OxyFarms is a venture of Oxychain.**
		
		>This token represents the seed contribution to Oxychain ecosystem. Every 4 NFTrees minted, 1 real tree will be planted.
		
		>NFTree Genesis holders will be given access to governance and participation in the project during the following drop.
		
		>**Let's go neutral!**`,
    'image': `${process.env.IPFS_PATH}/QmZqY65SJaJE5E8yXJJ7NjtJSh4bUXuHH8qECBc2WXsQrA`,
    'animation_url': `${process.env.IPFS_PATH}/QmNQEKVCwVeL2xVN2SZhbAmMWQt4cq3eR9uwqg4UJZs4CG`,
    'external_link': `https://oxyfarms.earth/token/${token_id}`
  }
  res.send(data)
});

/**
 * @Auth::GetChallenge
 * This method check if the address that wants to log as an OG holder
 * - If yes: returns a challenge to be signed
 * - If no: returns fail
 */
app.get("/auth/:MetaAddress", metaAuth, (req, res) => {
  res.send(req.metaAuth.challenge);
});

/**
 * @Auth::Authenticate
 * Based on the challenge, the {see @Auth::GetChallenge}, this method verifies
 * if the user signed the message with the right private key.
 * - If yes, it will return an authentication token + the user profile
 * - If no, it will fail
 */
app.get("/auth/:MetaMessage/:MetaSignature", metaAuth, (req, res) => {
  if (req.metaAuth.recovered) {
    const userWhitelistPath = `${process.env.WHITELIST_PATH}${req.metaAuth.recovered}`;

    const data = {
      whitelisted: true
    };
    if (!fs.existsSync(userWhitelistPath)) {
      fs.writeFile(userWhitelistPath, JSON.stringify(data), (err) => {});
    }
    res.send(data);
  } else {
    res.status(500).send();
  }
});

app.listen(app.get('port'), function() {
  console.log('OxyFarms microservice is running on port', app.get('port'));
})
