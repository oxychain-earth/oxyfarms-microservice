const axios = require('axios')

// Update Contract Address Here
const OPENSEA_URI = 'https://api.opensea.io/api/v1/asset/0xaff60161559c53bf1d3ac8c99a272d04768a1813';

// Maximum Tokens Belonging to Contract
const MAX_TOKENS = 137;

function refreshData(tokenId) {
    const URI = `${OPENSEA_URI}/${tokenId}/?force_update=true`;

    axios.get(URI)
        .then(res => res.json())
        .then(json =>  {
            if(json.detail) {
                console.log(`failed: ${tokenId}`);
            } else if(json.token_id) {
                console.log(`success: ${tokenId}`);
            }
        })
        .catch(err => console.error(`failed: ${tokenId}`));
};


const refreshTokens = (start, end) => {
    Array.from({length: end - start + 1}, (x, i) => start + i).forEach((tokenId) => {
        refreshData(tokenId);
    });
}

let start = 0;
let end = 1;

const id = setInterval(() => {
    refreshTokens(start, end);
    if(end > MAX_TOKENS) clearInterval(id);
    start = end + 1;
    end = start + 1;
},2000);
