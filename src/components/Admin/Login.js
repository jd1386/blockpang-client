import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import axios from 'axios';
import util from '../../util';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Login extends Component {
  state = {
    enteredEmail: '',
    enteredPassword: '',
    isAdminLoggedIn: false
  };

  _handleOnSubmit() {
    axios
      .post(util.API_URLS['token'], {
        username: this.state.enteredEmail,
        password: this.state.enteredPassword
      })
      .then(res => {
        localStorage.setItem('adminToken', res.data.token);
        this.props.onLogIn();
      })
      .catch(err => {
        toast.error('Authentication failed');
      });
  }

  _handleOnEmailChange(data) {
    this.setState({
      enteredEmail: data.value
    });
  }

  _handleOnPasswordChange(data) {
    this.setState({
      enteredPassword: data.value
    });
  }

  render() {
    if (!this.state.isAdminLoggedIn) {
      return (
        <div className="login-form" style={{ paddingTop: '30vh' }}>
          <Grid
            textAlign="center"
            style={{ height: '100%' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                <Image src="/favicon.ico" /> Log-in to your account
              </Header>
              <Form size="large" onSubmit={() => this._handleOnSubmit()}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    onChange={(e, data) => this._handleOnEmailChange(data)}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    onChange={(e, data) => this._handleOnPasswordChange(data)}
                  />

                  <Button color="teal" fluid size="large">
                    Login
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
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
        </div>
      );
    } else {
      return <Redirect to={'/admin'} />;
    }
  }
}

export default Login;
