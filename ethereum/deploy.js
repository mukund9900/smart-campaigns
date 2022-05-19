const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');


const provider = new HDWalletProvider(
  'dream hard tape frost bacon clip gown thumb scatter trip trash moment',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/7c63dc04c54042eb9b76e2a9764ecb60'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x'+compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to',result.options.address);


  provider.engine.stop();
};
deploy();
