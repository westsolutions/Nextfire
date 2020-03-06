import React, { useEffect, useState } from "react";
import NavBar from "@components/Navigation/NavBar";
import { useRouter } from "next/router";
import { useAuth } from "reactfire";
import { SIGN_IN } from "@constants/routes";
import { Loader } from "react-loader";

const MainLayout: React.FC<{}> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [isLoading, setLoaing] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser: any) => {
      if (currentUser) {
        setLoaing(false);
      } else {
        router.push(SIGN_IN);
      }
    });
    return () => {
      setLoaing(false);
    };
  });

  return (
    <div className="layout-main">
      <NavBar />
      {children}
    </div>
  );
};

export default MainLayout;
