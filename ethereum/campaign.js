import web3 from "./web3";
import Campaigns from "./build/Campaign.json";

const Campaign = (address) => {
  return new web3.eth.Contract(JSON.parse(Campaigns.interface), address);
};

export default Campaign;
