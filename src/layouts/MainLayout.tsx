import React, { useEffect, useState } from "react";
import NavBar from "@components/Navigation/NavBar";
import { useRouter } from "next/router";
import { useAuth } from "reactfire";
import { SIGN_IN } from "@constants/routes";
import Loader from "react-loader";

const MainLayout: React.FC<{}> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [isLoaded, setLoaing] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser: any) => {
      if (currentUser && localStorage.getItem(currentUser.email)) {
        setLoaing(true);
      } else {
        router.push(SIGN_IN);
      }
    });
    return () => {
      setLoaing(true);
    };
  });

  return (
    <Loader
      loaded={isLoaded}
      top={"50%"}
      left={"50%"}
      width={3}
      length={1}
      color="#fff"
      position={"fixed"}
    >
      <div className="layout-main">
        <NavBar />
        {children}
      </div>
    </Loader>
  );
};

export default MainLayout;
