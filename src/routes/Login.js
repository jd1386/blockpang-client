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

class Login extends Component {
  state = {
    isLoginSuccessful: false
  };

  _signup(res, provider) {
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
    if (userData) {
      axios.get(util.API_URLS['totaluser']).then(res => {
        const user = res.data.find(user => {
          return user.email === userData.email;
        });
        util.setUserData(JSON.stringify(userData));
        if (user.wallet) util.setWalletAddress(user.wallet);
        util.transferPreviousScore();
        this.setState({ isLoginSuccessful: true });
        this.props.login();
      });
    }
  }

  _responseGoogle = res => {
    // console.log('google-res', res);
    this._signup(res, 'google');
  };

  _responseFacebook = res => {
    // console.log('facebook-res', res);
    this._signup(res, 'facebook');
  };

  render() {
    if (this.state.isLoginSuccessful || util.isLoggedIn()) {
      return <Redirect to={'/'} />;
    }
    const { _responseGoogle, _responseFacebook } = this;

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
                  onFailure={_responseGoogle}
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
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default Login;
