import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';
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
        />
        <Menu.Item
          name="page-2"
          active={activeItem === 'page-2'}
          onClick={this.handleItemClick}
          as={Link}
          to="/admin/page-2"
        />
        <Menu.Item
          name="page-3"
          active={activeItem === 'page-3'}
          onClick={this.handleItemClick}
          as={Link}
          to="/admin/page-3"
        />
      </Menu>
    );
  }
}

export default LeftSidebar;
