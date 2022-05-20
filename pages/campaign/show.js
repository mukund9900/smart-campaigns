import React from "react";
import { Card } from "semantic-ui-react";
import Layout from "../../components/layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

class CampaignShow extends React.Component {
  static async getInitialProps(props) {
    const _campaign = await Campaign(props.query.address);
    const summary = await _campaign.methods.getSummary().call();
    /**
     * minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
     */
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requests: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderSummaryDetails() {
    const { minimumContribution, balance, approversCount, manager, requests } =
      this.props;
    const items = [
      {
        header: manager,
        description: "Manager Public Address",
        meta: "Owner of the campaign created, can create requests to witdraw the money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        description: "Minimum Contribution (wei)",
        meta: "You must contribute a minimum of the above value to become an approver",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        description:
          "Balance, is the how much money this campaign has left to spend",
        meta: "Contract Balance (ether)",
      },
      {
        header: requests,
        description:
          "Number of Request created by the manager, and approvers can approve the requests",
        meta: "Number of requests",
      },
      {
        header: approversCount,
        description: "Number ",
        meta: "Number of contributers to the campaign",
      },
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return <Layout>{this.renderSummaryDetails()}</Layout>;
  }
}

export default CampaignShow;
