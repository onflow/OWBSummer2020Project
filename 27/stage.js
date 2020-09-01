const fs = require('fs');
const chain = require('./src/utils/blockchain');

const contractAddr = '01cf0e2f2f715450';

const config = {
  httpUri: 'http://localhost:8080',
  serviceWallet: {
    address: 'f8d6e0586b0a20c7',
    keys: [
      {
        publicKey: '80478d6c870c52f33a41d047864bf2d582d77849ca95f7cdf3fa14e3517a21193f73e6c9a004aea72c444cf4fd049a71a0bf67cc3e1170368434383c98b1ea48',
        privateKey: '398ffa83e34ac67bf61fa8ab907eb05393f49404de953a20da525db1aa355c6f',
        keyId: 0,
        weight: 1000
      }
    ]
  }
};

function getEntropy() {
  let entropy = [];
  for (let e = 0; e < 24; e++) {  // Minimum 24 bytes needed for entropy
    entropy.push(Math.floor(Math.random() * 254));      // This is totally contrived for test account generation
  }
  return entropy;
}

async function stage() {
  let keyInfo = [];
  let keyCount = 3;
  for (let k = 0; k < keyCount; k++) {
    keyInfo.push({
      entropy: getEntropy(),  // Non-deterministic entropy
      weight: k < Math.ceil(keyCount / 2) ? 1000 : 500     // Half the keys will be 1000, the remaining 500
    });
  };

  let account;
  if (fs.existsSync('contractAccount.json')) {
    try {
      account = JSON.parse(fs.readFileSync('./contractAccount.json'));
    } catch (err) {
      account = undefined;
    }
  }
  if (!account) {
    account = await chain.createAccount(config, keyInfo);
    fs.writeFileSync('contractAccount.json', JSON.stringify(account));
  }

  await chain.deployContract(
    config,
    contractAddr,
    account.keys[0],
    `pub contract NonFungibleToken {
      // Declare the NFT resource type
      pub resource NFT {
        // The unique ID that differentiates each NFT
        pub let id: UInt64

        // String mapping to hold metadata
        pub var metadata: {String: String}

        // Initialize both fields in the init function
        init(initID: UInt64) {
          self.id = initID
          self.metadata = {}
        }
      }

      // Create a single new NFT and save it to account storage
      init() {
        self.account.save<@NFT>(<-create NFT(initID: 1), to: /storage/NFT1)
      }
    }
  `);
}

stage().then(console.log).catch(console.log);
