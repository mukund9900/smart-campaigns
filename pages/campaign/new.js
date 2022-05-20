import React from "react";
import Layout from "../../components/layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import {Link, Router} from '../../routes';

class CampaignNew extends React.Component {
  state = {
    minContribution: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minContribution)
        .send({ from: accounts[0] });
      Router.pushRoute('/');
    } catch (e) {
      this.setState({ errorMessage: e.message });
    } finally {
      this.setState({ loading: false });
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
          <Button primary loading={this.state.loading}>
            Create Campaign
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
