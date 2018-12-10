import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import './style.scss';

class LeftSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'dashboard'
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fluid pointing secondary vertical style={{ background: '#fff' }}>
        <Menu.Item
          name="dashboard"
          active={activeItem === 'dashboard'}
          onClick={this.handleItemClick}
          as={Link}
          to="/admin/"
          style={{ fontSize: 'calc(8px + 1vw)' }}
        />
        <Menu.Item
          name="settings"
          active={activeItem === 'settings'}
          onClick={this.handleItemClick}
          as={Link}
          to="/admin/settings"
          style={{ fontSize: 'calc(8px + 1vw)' }}
        />
      </Menu>
    );
  }
}

export default LeftSidebar;
