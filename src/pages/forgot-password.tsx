import store from '../redux/store';
import { Provider } from 'react-redux';
import React from 'react';
import ForgotPassword from '../components/Auth/ForgotPassword';
import Link from 'next/link';

export default class extends React.Component {
  render() {
    return (
      <div>
        
          <ForgotPassword />
      </div>
    );
  }
}
