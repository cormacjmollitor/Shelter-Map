
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class SignIn extends React.Component {

  state = {
    email: "",
    password: ""
  }

  changeEmail = () => {
    this.setState({ email: this.email.value });
  }

  changePassword = () => {
    this.setState({ password: this.password.value });
  }

  render(){
    return(
      <div>
        <div className="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <h3 style={{color: '#428bca', textAlign: 'center'}}>Login</h3>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
              </FormGroup>
            </Form>
            <a href="/shelter1/stats"><Button color="primary"
                    style={{ marginRight: '5px', cursor: 'pointer', width: "100%"}}
                      >
                      Login
            </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

}
