import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "reactfire";
import { INDEX, SIGN_IN } from "@constants/routes";

const NavBar: React.FC<{}> = () => {
  const auth = useAuth();
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authSubscription = auth.onAuthStateChanged((currentUser: any) => {
      if (authenticated !== !!currentUser) {
        setAuthenticated(!!currentUser);
      }
    });
    return () => authSubscription();
  });

  const logout = () => {
    if (auth.currentUser && auth.currentUser.email) {
      localStorage.removeItem(auth.currentUser.email);
    }
    auth.signOut().then(res => {
      router.push(SIGN_IN);
    });
  };

  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-between">
        <Link href="/">
          <a className="navbar-brand">
            <img src={process.env.LOGO_URL} />
          </a>
        </Link>
        <div className="media align-items-center navbar-profile">
          {authenticated && (
            <>
              <div className="media-body">
                <h6>My Account</h6>
              </div>
              {auth?.currentUser?.displayName && (
                <img
                  className="rounded-circle"
                  src={`https://getstream.io/random_svg/?name=${auth?.currentUser?.displayName}`}
                  alt={auth?.currentUser?.displayName}
                />
              )}
              <div
                className="navbar-logout"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
