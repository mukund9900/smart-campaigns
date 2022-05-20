import web3 from "./web3";
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(campaignFactory.interface),
    '0x547BF4C630565DFEcf297249DfDBE8d83bca0406'
);

export default instance;