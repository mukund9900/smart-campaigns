import React from "react";
import { Form, Message, Button, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/layout";

class RequestNew extends React.Component {
  state = {
    description: "",
    value: "",
    recipient: "",
    errorMessage: "",
    loading: false,
  };
  static async getInitialProps(props) {
    const address = props.query.address;
    return { address: address };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const campaign = await Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          this.state.description,
          web3.utils.toWei(this.state.value, "ether"),
          this.state.recipient
        )
        .send({ from: accounts[0] });
      Router.pushRoute(`/campaign/${this.props.address}/requests`);
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaign/${this.props.address}/requests`}>
          <a className="item">Back</a>
        </Link>
        <h3>Create Request.</h3>
        <Form
          onSubmit={this.onSubmit}
          style={{ width: "50%" }}
          error={!!this.state.errorMessage}
        >
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <lable>Value</lable>
            <Input
              label="Ether"
              labelPosition="right"
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              label="Hex"
              labelPosition="right"
              value={this.state.recipient}
              onChange={(e) => this.setState({ recipient: e.target.value })}
            />
          </Form.Field>
          <Message error header="Opps!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create Request
          </Button>
        </Form>
      </Layout>
    );
  }
}
export default RequestNew;
