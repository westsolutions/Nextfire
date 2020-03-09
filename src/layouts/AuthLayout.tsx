import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "reactfire";
import Loader from "react-loader";
import { INDEX } from "@constants/routes";

const AuthLayout: React.FC<{}> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [isLoaded, setLoaing] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser: any) => {
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

  return (
    <Loader
      loaded={isLoaded}
      width={3}
      color="#fff"
      length={1}
      top={"50%"}
      left={"50%"}
      position={"fixed"}
    >
      <div className="layout-auth">
        <div className="container">
          <div className="layout-auth__container">
            <div className="layout-auth__logo">
              <Link href="/">
                <img src={process.env.LOGO_URL} />
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
