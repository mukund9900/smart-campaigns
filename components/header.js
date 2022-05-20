import React from "react";
import { Menu } from "semantic-ui-react";

const Header = (props) => {
  return (
    <Menu style={{marginTop:'10px'}}>
      <Menu.Item name="browse">_crowdFund</Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item name="signup">Campaigns</Menu.Item>

        <Menu.Item name="help">Help</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
export default Header;
