import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

const Header = (props) => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">_crowdFund</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>

        <Link route="/">
          <a className="item">Help</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
export default Header;
