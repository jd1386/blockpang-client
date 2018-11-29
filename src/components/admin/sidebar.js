import React, { Component } from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';
import './style.scss';

class LeftSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home'
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fluid pointing secondary vertical style={{ background: '#fff' }}>
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
          className="menu-item"
        />
        <Menu.Item
          name="messages"
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
          className="menu-item"
        />
        <Menu.Item
          name="friends"
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
          className="menu-item"
        />
      </Menu>
    );
  }
}

export default LeftSidebar;
