import React from "react";
import Campaign from "../ethereum/campaign";
import { Button, Form, Input, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends React.Component {
  state = {
    value: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    const _campaign = await Campaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await _campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
      Router.replace(`/campaign/${this.props.address}`);
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>
            <h3>Amount to contribute</h3>
          </label>
          <Input
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message
          error
          header="There was some errors with your submission"
          list={[this.state.errorMessage]}
        />
        <Button color="facebook" loading={this.state.loading}>
          Contribute
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
