import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Image, Button, Menu } from "semantic-ui-react";
import "./style.css";

class Navbar extends Component {
  render() {
    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as={Link} to="/" header>
              <Image
                className="app-logo"
                size="mini"
                src="favicon.ico"
                style={{ marginRight: "1.5em" }}
              />
              블록팡
            </Menu.Item>
            <Menu.Item as={Link} to="/my-page">
              My Page
            </Menu.Item>
            <Menu.Item as={Link} to="/admin">
              Admin
            </Menu.Item>
            <Menu.Item position="right">
              <Button as={Link} to="/login" inverted>
                Log in
              </Button>
              <Button
                as={Link}
                to="/login"
                primary
                style={{ marginLeft: "0.5em" }}
              >
                Sign up
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
