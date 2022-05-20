import React from "react";
import Layout from "../../components/layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class CampaignNew extends React.Component {
  state = {
    minContribution: "",
    errorMessage: "",
  };

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minContribution)
        .send({ from: accounts[0] });
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
  };

  render() {
    return (
      <Layout>
        <h1>Create Campaign!</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minContribution}
              onChange={(e) =>
                this.setState({ minContribution: e.target.value })
              }
            ></Input>
          </Form.Field>
          <Message
            error
            header="There was some errors with your submission"
            list={[this.state.errorMessage]}
          />
          <Button primary>Create Campaign</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
