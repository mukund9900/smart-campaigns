import React from "react";
import { Button, Card, Grid } from "semantic-ui-react";
import Layout from "../../components/layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/contributeForm";
import { Link } from "../../routes";

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
      address: props.query.address,
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
        description:
          "Number of contributors and also who can approve the requestds created by managerf to spend money",
        meta: "Number of contributors to the campaign",
      },
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign summary!</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width="10">{this.renderSummaryDetails()}</Grid.Column>
            <Grid.Column width="6">
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaign/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Request</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
