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
    auth.signOut().then(res => {
      router.push(SIGN_IN);
    });
  };

  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <Link href="/">
        <a className="navbar-brand">
          <img src={process.env.LOGO_URL} />
        </a>
      </Link>
      <div className="media align-items-center navbar-profile">
        <div className="media-body">
          <h6>Welcome, {auth?.currentUser?.displayName}</h6>
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
      </div>
    </nav>
  );
};

export default NavBar;
