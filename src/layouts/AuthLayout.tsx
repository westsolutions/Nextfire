import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from 'reactfire';
import Loader from 'react-loader';
import { INDEX } from '@constants/routes';

const AuthLayout: React.FC<unknown> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [isLoaded, setLoaing] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser && localStorage.getItem(currentUser.email)) {
        router.push(INDEX);
      } else {
        setLoaing(true);
      }
    });
    return () => {
      setLoaing(true);
    };
  });

  const backgroundImage = process.env.NEXT_PUBLIC_BG_AUTH_URL
    ? `url("${process.env.NEXT_PUBLIC_BG_AUTH_URL}")`
    : null;

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
      <div className="layout-auth" style={{ backgroundImage }}>
        <div className="container">
          <div className="layout-auth__container">
            <div className="layout-auth__logo">
              <Link href="/">
                <img src={process.env.LOGO_AUTH_URL} />
              </Link>
            </div>
            {children}
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default AuthLayout;
