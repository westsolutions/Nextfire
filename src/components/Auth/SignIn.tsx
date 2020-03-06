import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import { MoonLoader } from "react-spinners";

import { IUser } from "../../interfaces";
import { signInUser } from "../../redux/actions";

type Props = {
  user?: IUser;
  facts?: any;
  // {
  //   all: {
  //     _id: string;
  //     text: string;
  //     user: { name: { first: string; last: string } };
  //   }[];
  // };
  signInUser?: (user: { email: string; password: string }) => Promise<string>;
  fetchUser?: () => Promise<string>;
};

type State = {
  email: string;
  password: string;
  error: string;
  signingIn: boolean;
};

class SignIn extends Component<Props, State> {
  state = {
    email: "",
    password: "",
    error: null,
    signingIn: false
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ signingIn: true });
    this.props
      .signInUser({ email: this.state.email, password: this.state.password })
      .catch((err: { code: string; message: string }) => {
        this.setState({ signingIn: false });
        this.setState({ error: err.code });
      })
      .then(response => {
        this.setState({ signingIn: false });
        if (!Router.router.query.current || Router.router.query.current === "/")
          response && Router.push("/dashboard");
        else {
          response &&
            Router.router.query.current &&
            Router.push(`${Router.router.query.current}`);
        }
      });
  };
  render() {
    const { facts } = this.props;

    return (
      <div>
        <nav>
          <span className="navbar-brand">
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </span>
          <form onSubmit={this.handleSubmit}>
            <div style={{ color: "whitesmoke" }}>
              <label htmlFor="emailInput"> Email Address</label>
              <input
                id="emailInput"
                type="email"
                name="email"
                onChange={event => this.setState({ email: event.target.value })}
              />
              <small>
                {" "}
                Not a user ? register{" "}
                <Link href="/signup">
                  <a>here</a>
                </Link>{" "}
              </small>
            </div>
            <div style={{ color: "whitesmoke" }}>
              <label htmlFor="passwordInput"> Password</label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
              />
              <small>
                Forgot your password , click{" "}
                <Link href="/forgot-password">
                  <a> here</a>
                </Link>
              </small>
            </div>

            <div>
              {this.state.signingIn ? (
                <div>
                  <MoonLoader sizeUnit={"px"} size={30} color={"whitesmoke"} />{" "}
                </div>
              ) : (
                <button
                  disabled={this.state.signingIn}
                  type="submit"
                  style={{ marginTop: "40%" }}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </nav>
        <div style={{ margin: "auto", width: "fit-content", color: "red" }}>
          {this.state.error
            ? this.state.error
                .split("/")[1]
                .split("-")
                .join(" ")
            : ""}
        </div>
        <div>
          {facts &&
            facts.all &&
            facts.all.map(item => (
              <div key={item._id}>
                <div>
                  <h5>{item.user && item.user.name.first}</h5>
                  <h6>{item.user && item.user.name.last}</h6>
                  <p> {item.text.substr(0, 100)}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(
  mapStateToProps
  // { signInUser }
)(SignIn);
