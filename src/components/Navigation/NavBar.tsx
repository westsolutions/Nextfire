import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//TODO: useUser not working in current relase
import { useAuth } from "reactfire";

const NavBar: React.FC<{ openAuthModal }> = ({ openAuthModal }) => {
  const auth = useAuth();
  const router = useRouter();

  const logout = () => {
    if (auth.currentUser && auth.currentUser.email) {
      localStorage.removeItem(auth.currentUser.email);
    }
    auth.signOut().then(res => {});
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
          {!!auth?.currentUser && (
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
                )
              </div>
            </div>
          )}
          {!auth.currentUser && (
            <button
              className="btn btn-link"
              onClick={() => {
                openAuthModal();
              }}
            >
              Login
            </button>
          )}
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
