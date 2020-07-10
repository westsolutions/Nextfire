import React, { useState, useEffect } from 'react';
import Loader from 'react-loader';
import { useRouter } from 'next/router';
import { useAuth } from 'reactfire';
import { SIGN_IN } from '@constants/routes';
import NavBar from '@components/Navigation/NavBar';
import { version } from '../../package.json';

interface Props {
  children: JSX.Element;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [isLoaded, setLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser && localStorage.getItem(currentUser.email)) {
        setLoading(true);
      } else {
        router.push(SIGN_IN);
      }
    });
    return () => {
      setLoading(true);
    };
  });

  return (
    <Loader
      loaded={isLoaded}
      width={3}
      color="#fff"
      length={1}
      top={'50%'}
      left={'50%'}
      position={'fixed'}
    >
      <div className="layout-main">
        <NavBar />
        {children}
        <footer className="footer-app-version">
          App version: {version ? version : 'n/a'}
        </footer>
      </div>
    </Loader>
  );
};

export default MainLayout;
