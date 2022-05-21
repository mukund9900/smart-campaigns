import React from "react";
import { Button, Table, Message } from "semantic-ui-react";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/requestRow";
import web3 from "../../../ethereum/web3";

class Requests extends React.Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const campaign = await Campaign(address);
    const reqCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array.from({ length: parseInt(reqCount) }, (e, i) => {
        return campaign.methods.requests(i).call();
      })
    );

    return { address, requests, reqCount, approversCount };
  }
  approveContract = async (index) => {
    const accounts = await web3.eth.getAccounts();
    const campaign = await Campaign(this.props.address);
    await campaign.methods.approveRequest(index).send({
      from: accounts[0],
    });
    Router.pushRoute(`/campaign/${this.props.address}/requests/`);
  };
  finalizeContract = async (index) => {
    const accounts = await web3.eth.getAccounts();
    const campaign = await Campaign(this.props.address);
    await campaign.methods.finalizeRequest(index).send({
      from: accounts[0],
    });
    Router.pushRoute(`/campaign/${this.props.address}/requests/`);
  };
  renderRow = () => {
    return this.props.requests.map((req, i) => {
      return (
        <RequestRow
          request={req}
          index={i}
          address={this.props.address}
          approversCount={this.props.approversCount}
          approveContract={this.approveContract}
          finalizeContract={this.finalizeContract}
        />
      );
    });
  };

  render() {
    const { Header, Row, HeaderCell, Body, Footer } = Table;

    return (
      <Layout>
        <Link route={`/campaign/${this.props.address}`}>
          <a className="item">Back</a>
        </Link>

        <h3>Requests</h3>
        <Link route={`/campaign/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Create Request</Button>
          </a>
        </Link>
        <Table celled>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        {parseInt(this.props.reqCount) > 0 ? (
          <Message
            success
            header={`Hey you have ${this.props.reqCount} requests for selected campaign!`}
            content="Contributers check the requests and approve carefully and manager can finilise if requests are approved! "
          />
        ) : null}
      </Layout>
    );
  }
}

export default Requests;
//ID Description Amount Recipient Approval Count Approve Finalize
