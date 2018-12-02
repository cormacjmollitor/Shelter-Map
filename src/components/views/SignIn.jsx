
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import houseimage from '../../../images/icon-shelter.png';

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
          <div class="col-md-6">
            <img src={houseimage} style={{height: "500px", width:"500px", padding: "47px"}} alt="house-image"/>
          </div>
          <div class="col-md-6" style={{ padding: "57px"}}>
            <h3 style={{color: '#428bca', textAlign: 'center'}}>Login</h3>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="Enter Email" />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="Enter Password" />
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
