import { Link } from "../routes";
import React from "react";
import { Button, Table, Icon } from "semantic-ui-react";
import web3 from "../ethereum/web3";

class RequestRow extends React.Component {
  onApprove = async (e) => {
    e.preventDefault();
    const { index } = this.props;
    await this.props.approveContract(index);
  };
  finalize = async (e) => {
    e.preventDefault();
    const { index } = this.props;
    await this.props.finalizeContract(index);
  };
  render() {
    const { Row, Cell } = Table;
    const readyToFinalize =
      this.props.request.approvalCount > this.props.approversCount / 2;
    const _approveButtonColor = this.props.request.complete ? "grey" : "blue";
    const _finalizeColor = this.props.request.complete ? "grey" : "teal";

    return (
      <Row
        disabled={this.props.request.complete}
        positive={readyToFinalize && !this.props.request.complete}
      >
        <Cell>{this.props.index}</Cell>
        <Cell>{this.props.request.description}</Cell>
        <Cell>{web3.utils.fromWei(this.props.request.value, "ether")}</Cell>
        <Cell>{this.props.request.recipient}</Cell>
        <Cell>
          {this.props.request.approvalCount}/{this.props.approversCount}
        </Cell>
        <Cell>
          <Button
            icon
            labelPosition="left"
            onClick={this.onApprove}
            color={_approveButtonColor}
          >
            <Icon name="thumbs up outline" />
            Approve
          </Button>
        </Cell>
        <Cell>
          <Button
            icon
            labelPosition="left"
            color={_finalizeColor}
            onClick={this.finalize}
          >
            <Icon name="angle double up" />
            Finalize
          </Button>
        </Cell>
      </Row>
    );
  }
}
export default RequestRow;
