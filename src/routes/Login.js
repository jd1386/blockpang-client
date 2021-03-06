/* eslint-disable default-case */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Button,
  Segment,
  Icon
} from 'semantic-ui-react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import util from '../util';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Login extends Component {
  state = {
    isLoginSuccessful: false
  };

  async _signup(res, provider) {
    let userData;

    if (provider === 'google' && res.profileObj.email) {
      userData = {
        email: res.profileObj.email,
        name: res.profileObj.name,
        provider_id: res.profileObj.googleId,
        provider_pic: res.profileObj.imageUrl,
        token: res.tokenObj.access_token,
        provider
      };
    }
    if (provider === 'facebook' && res.email) {
      userData = {
        name: res.name,
        email: res.email,
        provider_id: res.id,
        provider_pic: res.picture.data.url,
        token: res.accessToken,
        provider
      };
    }

    const user = await axios.get(util.API_URLS['totaluser']).then(res => {
      return res.data.find(user => {
        return user.email === userData.email;
      });
    });

    if (user) {
      util.setUserData(JSON.stringify(userData));
      util.setWalletAddress(user.wallet);
      util.transferPreviousScore();
      this.setState({ isLoginSuccessful: true });
      this.props.login();
    } else {
      util.setUserData(JSON.stringify(userData));
      this.setState({ isLoginSuccessful: true });
      this.props.login();
    }
  }

  _responseGoogle = res => {
    this._signup(res, 'google');
  };

  _responseFacebook = res => {
    this._signup(res, 'facebook');
  };

  _responseFail = res => {
    this._notify('error', 'Failed to log you in. Please try again!');
  };

  _notify(type, message) {
    switch (type) {
      case 'success':
        toast.info(message);
        break;
      case 'error':
        toast.error(message);
        break;
    }
  }

  render() {
    if (this.state.isLoginSuccessful || util.isLoggedIn()) {
      return <Redirect to={'/'} />;
    }
    const { _responseGoogle, _responseFacebook, _responseFail } = this;

    return (
      <Container>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid centered columns={2}>
            <Grid.Column textAlign="center">
              <Header as="h1">Login/Signup Page</Header>
            </Grid.Column>

            <Grid.Row centered columns={2}>
              <Grid.Column>
                <GoogleLogin
                  clientId="20533539681-m3u6pn3m31sssrg6tbin56plja4gi9j7.apps.googleusercontent.com"
                  render={renderProps => (
                    <Button
                      icon
                      fluid
                      size="huge"
                      onClick={renderProps.onClick}
                    >
                      <Icon name="google" /> Login with Gmail
                    </Button>
                  )}
                  buttonText="Login"
                  onSuccess={_responseGoogle}
                  onFailure={_responseFail}
                />
              </Grid.Column>
              <Grid.Column>
                <FacebookLogin
                  appId="493696594477030"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={_responseFacebook}
                  cssClass="ui huge fluid icon button"
                  icon="fa-facebook"
                  textButton=" Login with Facebook"
                  onFailure={_responseFail}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable={false}
            pauseOnHover
          />
        </Segment>
      </Container>
    );
  }
}

export default Login;
