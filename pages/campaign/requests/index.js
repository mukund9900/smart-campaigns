import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/layout";
import Campaign from "../../../ethereum/campaign";

class Requests extends React.Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    const campaign = await Campaign(address);
    const reqCount = await campaign.methods.getRequestsCount().call();
    // console.log(reqCount);
    const requests = await Promise.all(
      Array.from({ length: parseInt(reqCount) }, (e, i) => {
        return campaign.methods.requests(i).call();
      })
    );
    // console.log({ address, requests, reqCount });
    return { address, requests, reqCount };
  }
  render() {
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaign/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Create Request</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default Requests;
