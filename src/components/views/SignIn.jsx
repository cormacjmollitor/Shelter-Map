
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../stylesheets/signin.scss';

export default class SignIn extends React.Component {
render(){
  return(
    <div>
      <div class="container">
        <div class="container__child signup__thumbnail">
          <div class="thumbnail__logo">
            <h1 class="logo__text"></h1>
          </div>
          <div class="thumbnail__content text-center">
            <h2 class="heading--secondary">Welcome.</h2>
            <p class="intropara">
              Content of this paragraph can be some introduction or instructions for the users.
            </p>
          </div>
          <div class="signup__overlay">

          </div>
        </div>
        <div class="container__child signup__form">
          <div class="login-wrap">
            <div class="login-html">
              <input id="tab-1" type="radio" name="tab" class="sign-in" checked /><label for="tab-1" class="tab">Sign In</label>
              <input id="tab-2" type="radio" name="tab" class="sign-up" /><label for="tab-2" class="tab">Sign Up</label>
              <div class="login-form">
                <div class="sign-in-htm">
                  <div class="group">
                    <label for="user" class="label">Username</label>
                    <input id="user" type="text" class="input" />
                  </div>
                  <div class="group">
                    <label for="pass" class="label">Password</label>
                    <input id="pass" type="password" class="input" data-type="password" />
                  </div>
                  <div class="group">
                    <input id="check" type="checkbox" class="check" checked />
                    <label for="check"><span class="icon"></span> Keep me Signed in</label>
                  </div>
                  <div class="group">
                    <input type="submit" class="button" value="Sign In" />
                  </div>
                  <div class="hr"></div>
                  <div class="foot-lnk">
                    <a href="#forgot">Forgot Password?</a>
                  </div>
                </div>
                <div class="sign-up-htm">
                  <div class="group">
                    <label for="user" class="label">Username</label>
                    <input id="user" type="text" class="input" />
                  </div>
                  <div class="group">
                    <label for="pass" class="label">Password</label>
                    <input id="pass" type="password" class="input" data-type="password" />
                  </div>
                  <div class="group">
                    <label for="pass" class="label">Repeat Password</label>
                    <input id="pass" type="password" class="input" data-type="password" />
                  </div>
                  <div class="group">
                    <label for="pass" class="label">Email Address</label>
                    <input id="pass" type="text" class="input" />
                  </div>
                  <div class="group">
                    <input type="submit" class="button" value="Sign Up" />
                  </div>
                  <div class="hr"></div>
                  <div class="foot-lnk">
                    <label for="tab-1" /><a>Already Member?</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
);
}

}