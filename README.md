# OxyFarms microservice <!-- omit in toc -->

The source code in this repo contains the APIs that serve OxyFarms website and public NFT marketplaces [OpenSea](https://opensea.io). 
This solution serves metadata following the [OpenSea standard](https://docs.opensea.io/docs/metadata-standards). The metadata for each token only includes a title, a description and an image.
The solution also allows a whitelisting process based on authentication and signing a message via MetaMask.

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Requirements
You need node.js (12.*) and npm installed to run it locally

1. Import the repository and `cd` into the new directory.
2. Run `npm install`.
3. Run `node index.js`.
4. Visit the token's metadata at http://localhost:%PORT%/token/1 (for token 1) -- coming soon.
5. Visit the contract-level metadata at http://localhost:%PORT%/contract/.

## Troubleshooting

If you have any questions, send them along with a hi to hello@oxychain.earth.
