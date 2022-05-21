const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const compiledCampaign = require("../ethereum/build/Campaign.json");
const compiledFactory = require("../ethereum/build/CampaignFactory.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: "0x" + compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe("Campains", () => {
  it("Deploys a factory and a campain", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("Marks caller as manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(manager, accounts[0]);
  });

  it("allow contributers to fund some min 100", async () => {
    await campaign.methods.contribute().send({
      value: "150",
      from: accounts[1],
    });

    const isCont = await campaign.methods.approvers(accounts[1]).call();
    assert(isCont);
  });

  it("it requires a minium contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "50",
        from: accounts[1],
      });
      assert(false);
    } catch (e) {
      assert(e);
    }
  });
  it("Mananger to make a payment req", async () => {
    await campaign.methods
      .createRequest("Buy snakes", "101", accounts[2])
      .send({
        from: accounts[0],
        gas: "1000000",
      });
    const req = await campaign.methods.requests(0).call();
    console.log(req);
    assert.equal("Buy snakes", req.description);
  });
  it("Process a request", async () => {
    await campaign.methods.contribute().send({
      value: web3.utils.toWei("10", "ether"),
      from: accounts[0],
    });
    await campaign.methods
      .createRequest(
        "crystal meth",
        web3.utils.toWei("5", "ether"),
        accounts[1]
      )
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let b = await web3.eth.getBalance(accounts[1]);
    b = web3.utils.fromWei(b, "ether");
    b = parseFloat(b);
    console.log('balance is ====', b)
    assert(b > 103)
  });
});
