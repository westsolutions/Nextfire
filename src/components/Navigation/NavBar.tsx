import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//TODO: useUser not working in current relase
import { useAuth } from "reactfire";
import { SIGN_IN, ACCESS } from "@constants/routes";

const NavBar: React.FC<{}> = () => {
  const auth = useAuth();
  const router = useRouter();

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
          <div className="media-body">
            <h6>My Account</h6>
            <div className="dropdown-menu">
              {!!auth?.currentUser && (
                <a
                  className="dropdown-item"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </a>
              )}
              {!auth?.currentUser && (
                <a
                  className="dropdown-item"
                  onClick={() => {
                    router.push(ACCESS);
                  }}
                >
                  Login
                </a>
              )}
            </div>
          </div>

          {auth?.currentUser?.displayName && (
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
