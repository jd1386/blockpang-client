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
      <Menu
        fluid
        pointing
        secondary
        vertical
        style={{ background: '#fff', fontSize: '1.2em' }}
      >
        <Menu.Item
          name="dashboard"
          active={activeItem === 'dashboard'}
          onClick={this.handleItemClick}
          as={Link}
          to="/admin/"
        />
        <Menu.Item
          name="settings"
          active={activeItem === 'settings'}
          onClick={this.handleItemClick}
          as={Link}
          to="/admin/settings"
        />
      </Menu>
    );
  }
}

export default LeftSidebar;
