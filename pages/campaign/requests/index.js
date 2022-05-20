import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/layout";

class Requests extends React.Component {
  static async getInitialProps(props) {
    const address = props.query.address;
    
    return { address: address };
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
