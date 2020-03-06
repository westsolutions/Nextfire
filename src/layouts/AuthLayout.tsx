import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "reactfire";
import { Loader } from "react-loader";
import { INDEX } from "@constants/routes";

const AuthLayout: React.FC<{}> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [isLoading, setLoaing] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser: any) => {
      if (currentUser) {
        router.push(INDEX);
      }
    });
    return () => {
      setLoaing(false);
    };
  });

  return (
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
  );
};

export default AuthLayout;
