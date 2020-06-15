import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//TODO: useUser not working in current relase
import { useAuth } from "reactfire";
import { INDEX } from "@constants/routes";

const NavBar: React.FC<{ openAuthModal }> = ({ openAuthModal }) => {
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
      router.push(INDEX);
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
            <div className="media-body">
              <h6>My Account</h6>
              <div className="dropdown-menu">
                <a
                  className="dropdown-item"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </a>
              </div>
            </div>
          )}
          {!authenticated && (
            <button
              className="btn btn-link"
              onClick={() => {
                openAuthModal();
              }}
            >
              Login
            </button>
          )}
          {authenticated && auth?.currentUser?.displayName && (
            <img
              className="rounded-circle"
              src={`https://getstream.io/random_svg/?name=${auth?.currentUser?.displayName}`}
              alt={auth?.currentUser?.displayName}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
