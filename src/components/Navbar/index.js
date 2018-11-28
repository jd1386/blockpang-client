import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Image, Button, Menu } from 'semantic-ui-react';
import './style.css';

class Navbar extends Component {
  menuChange = () => {
    let userData;
    if (localStorage.getItem('userData'))
      userData = JSON.parse(localStorage.getItem('userData'));

    return this.props.isLoggedIn ? (
      <Menu.Item position="right">
        <Image src={userData.provider_pic} avatar />
        <span style={{ marginRight: '1.5em' }}>{userData.name}</span>
        <Button as={Link} to="/" onClick={this.props.logout} inverted>
          Logout
        </Button>
      </Menu.Item>
    ) : (
      <Menu.Item position="right">
        <Button as={Link} to="/login" inverted>
          Log in
        </Button>
        <Button as={Link} to="/login" primary style={{ marginLeft: '0.5em' }}>
          Sign up
        </Button>
      </Menu.Item>
    );
  };
  render() {
    return this.props.isLoggedIn ? (
      <React.Fragment>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as={Link} to="/" header>
              <Image
                className="app-logo"
                size="mini"
                src="favicon.ico"
                style={{ marginRight: '1.5em' }}
              />
              블록팡
            </Menu.Item>
            <Menu.Item as={Link} to="/mypage">
              My Page
            </Menu.Item>
            <Menu.Item as={Link} to="/admin">
              Admin
            </Menu.Item>
            {this.menuChange()}
          </Container>
        </Menu>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as={Link} to="/" header>
              <Image
                className="app-logo"
                size="mini"
                src="favicon.ico"
                style={{ marginRight: '1.5em' }}
              />
              블록팡
            </Menu.Item>
            {this.menuChange()}
          </Container>
        </Menu>
      </React.Fragment>
    );
  }
}

export default Navbar;
