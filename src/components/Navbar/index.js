import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Image, Button, Menu } from 'semantic-ui-react';
import './style.scss';
import util from '../../util';
import favicon from '../../assets/img/favicon.ico';

class Navbar extends Component {
  _menuChange = () => {
    let userData;
    if (util.isLoggedIn()) {
      userData = util.userData();
    }

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
            <Menu.Item as={Link} to="/" header id="logo">
              <Image
                className="app-logo"
                size="mini"
                src={favicon}
                style={{ marginRight: '1.5em' }}
              />
              BlockPang
            </Menu.Item>
            <Menu.Item as={Link} to="/leaderboard">
              Leaderboard
            </Menu.Item>
            <Menu.Item as={Link} to="/mypage">
              My Page
            </Menu.Item>
            {this._menuChange()}
          </Container>
        </Menu>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as={Link} to="/" header id="logo">
              <Image
                className="app-logo"
                size="mini"
                src={favicon}
                style={{ marginRight: '1.5em' }}
              />
              BlockPang
            </Menu.Item>
            {this._menuChange()}
          </Container>
        </Menu>
      </React.Fragment>
    );
  }
}

export default Navbar;
