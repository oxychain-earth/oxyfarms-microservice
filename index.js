require('dotenv').config()

const express = require('express');

const PORT = process.env.PORT || 7000

const app = express().set('port', PORT)

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

app.listen(app.get('port'), function() {
  console.log('OxyFarms microservice is running on port', app.get('port'));
})
