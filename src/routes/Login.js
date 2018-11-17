import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Button,
  Segment,
  Icon
} from 'semantic-ui-react';
import GoogleLogin from 'react-google-login';

class Login extends Component {
  state = {
    redirect: false
  };

  signup(res, provider) {
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
    if (userData) {
      sessionStorage.setItem('userData', JSON.stringify(userData));
      this.setState({ redirect: true });
    }
    this.props.logon();
  }

  render() {
    if (this.state.redirect || sessionStorage.getItem('userData')) {
      return <Redirect to={'/'} />;
    }

    const responseGoogle = res => {
      console.log('google-res', res);
      this.signup(res, 'google');
    };

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
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                />
              </Grid.Column>
              <Grid.Column>
                <Button icon fluid size="huge">
                  <Icon name="facebook" /> Login with Facebook
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default Login;
