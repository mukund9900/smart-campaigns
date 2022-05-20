import web3 from "./web3";
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(campaignFactory.interface),
    '0xB0a9294827ebaa4457d70cC42c27A712Ff92eB66'
);

export default instance;