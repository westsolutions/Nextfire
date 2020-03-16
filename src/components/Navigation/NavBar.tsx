import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//TODO: useUser not working in current relase
import { useAuth } from "reactfire";
import { SIGN_IN } from "@constants/routes";

const NavBar: React.FC<{}> = () => {
  const auth = useAuth();
  const router = useRouter();

  const logout = () => {
    if (auth.currentUser.email) {
      localStorage.removeItem(auth.currentUser.email);
    }
    auth.signOut().then(res => {
      router.push(SIGN_IN);
    });
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container pl-0 pr-0 d-flex justify-content-between">
        <Link href="/">
          <a className="navbar-brand">
            <img src={process.env.LOGO_URL} />
          </a>
        </Link>
        <div className="media align-items-center navbar-profile">
          <div className="media-body">
            <h6>{auth?.currentUser?.displayName}</h6>
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
