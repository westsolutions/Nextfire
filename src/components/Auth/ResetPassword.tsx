import React, { Component } from "react";
import { connect } from "react-redux";
// import { fbUpdatePassword } from '../../firebase/auth';
import Link from "next/link";
import Router from "next/router";

class ResetPassword extends Component {
  state = {
    currentPassword: null,
    newPassword: null,
    confirmPassword: null,
    error: null
  };

  handleSubmit = event => {
    event.preventDefault();
    //checkPassword then
    if (this.state.newPassword === this.state.confirmPassword) {
      //this.props.resetPassword(this.state.newPassword) ;}
      // fbUpdatePassword(
      //   this.state.currentPassword,
      //   this.state.newPassword
      // ).catch(err => {
      //   switch (err.code) {
      //     case 'auth/wrong-password': {
      //       this.setState({ error: 'wrong password' });
      //       break;
      //     }
      //     default:
      //       this.setState(err.message);
      //   }
      // });
      // Router.push('/dashboard');
    }
  };
  render() {
    return (
      <div className="sign-up">
        <div>
          <div>{this.state.error || ""}</div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="currenPasswordInput">
                {" "}
                Please Enter Your Current Password
              </label>
              <input
                id="currenPasswordInput"
                type="password"
                name="currentPassword"
                onChange={event =>
                  this.setState({ currentPassword: event.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="newPassword1Input">
                {" "}
                Please Enter Your New Password
              </label>
              <input
                id="newPassword1Input"
                type="password"
                name="newPassword"
                onChange={event =>
                  this.setState({ newPassword: event.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="confirmPasswordInput">
                {" "}
                Please Confirm Your New Password
              </label>
              <input
                id="confirmPasswordInput"
                type="password"
                name="confirmPassword"
                onChange={event =>
                  this.setState({ confirmPassword: event.target.value })
                }
              />
              {this.state.confirmPassword &&
              this.state.newPassword !== this.state.confirmPassword ? (
                <small style={{ color: "red" }}> Passwords doesn't match</small>
              ) : (
                true
              )}
            </div>
            <button type="submit"> Submit </button>
            <small>
              {" "}
              Already a user , login{" "}
              <Link href="/signin">
                <a>here</a>
              </Link>
            </small>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(ResetPassword);
