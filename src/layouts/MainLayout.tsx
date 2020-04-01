import React, { useEffect, useState } from "react";
import NavBar from "@components/Navigation/NavBar";
import { useRouter } from "next/router";
import { useAuth } from "reactfire";
import { SIGN_IN } from "@constants/routes";
import Loader from "react-loader";

const MainLayout: React.FC<{}> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [isLoaded, setLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((currentUser: any) => {
      if (currentUser && localStorage.getItem(currentUser.email)) {
        setLoading(true);
      } else {
        router.push(SIGN_IN);
      }
    });
    return () => {
      setLoading(true);
    };
  });

  const backgroundImage = process.env.BG_DASHBOARD_URL
    ? `url("${process.env.BG_DASHBOARD_URL}")`
    : null;

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
      <div className="layout-main" style={{ backgroundImage }}>
        <NavBar />
        {children}
      </div>
    </Loader>
  );
};

export default MainLayout;
