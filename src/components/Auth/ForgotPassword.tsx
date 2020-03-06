import * as React from "react";
import { Component, FormEvent } from "react";
// import { connect } from 'react-redux';
// import Link from 'next/link';
import Router from "next/router";
import firebase from "../../firebase/index";

class ForgotPassword extends Component<any, any> {
  state = {
    email: null,
    status: null
  };

  handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() =>
        this.setState({
          status:
            "email has been sent , please follow the link to reset your password"
        })
      )
      .catch(err => this.setState({ status: err.message }));

    //confirm if email exists
    //then
    // this.setState({ emailConfirmed: true });
  };

  forgotPasswordForm = () => {
    return (
      <form onSubmit={this.handleEmailSubmit}>
        <div>
          <label htmlFor="emailInput">
            {" "}
            Please enter your registered email address
          </label>
          <input
            id="emailInput"
            type="email"
            name="email"
            onChange={event => this.setState({ email: event.target.value })}
          />
          <small> {this.state.status}</small>
        </div>
        <button type="submit" style={{ marginTop: 0 }}>
          {" "}
          Submit{" "}
        </button>
      </form>
    );
  };

  render() {
    return (
      <div className="forgot-password">
        <div>{this.forgotPasswordForm()}</div>
      </div>
    );
  }
}

export default ForgotPassword;
