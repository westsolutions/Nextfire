import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { signOutUser } from '../../redux/actions';
import Link from 'next/link'



class NavBar extends Component<
  { signOutUser: () => void },
  { dropdownOpen: boolean }
  > {
  constructor(props) {
    super(props);
    this.state = { dropdownOpen: false };
  }
  render() {
    return (
      <nav className="navbar navbar-light bg-light justify-content-between">
        <Link href="/">
          <a className="navbar-brand">
            <img src={process.env.LOGO_URL} />
          </a>
        </Link>
        <div className="media align-items-center">
          <div className="media-body">
            <h5 className="mt-0">John doe</h5>
          </div>
          <img className="ml-2 rounded-circle" src="https://via.placeholder.com/64x64" />
        </div>
      </nav>
    );
  }
}
    
const mapStateToProps = ({user, auth}) => { return {user, auth}; };
      
export default connect(mapStateToProps,{signOutUser})(NavBar)
