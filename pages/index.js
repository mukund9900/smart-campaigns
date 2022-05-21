import React from "react";

import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";

import Layout from "../components/layout";
import { Link } from "../routes";

class CampaignIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }
  renderCampaigns() {
    const items = this.props.campaigns.map((o) => {
      return {
        header: o,
        description: (
          <Link route={`/campaign/${o}/`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h2>Open Campaigns</h2>
          <Link route="/campaign/new">
            <a className="item">
              <Button
                floated="right"
                content="Create Campaign"
                icon="wordpress forms"
                color="facebook"
              />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
