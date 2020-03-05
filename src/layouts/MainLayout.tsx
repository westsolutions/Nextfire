import React from 'react';
import {AuthCheck} from 'reactfire';
import NavBar from '@components/Navigation/NavBar';
// import Signin from '../pages/signin';

const MainLayout: React.FC<{}> = ({ children }) => {
  return (
    <div className="layout-main">
      {/* <AuthCheck fallback={<Signin />}> */}
        <NavBar />
        {children}
      {/* </AuthCheck> */}
    </div>
  );
};

export default MainLayout;
