import React from "react";
import NavBar from "@components/Navigation/NavBar";

const MainLayout: React.FC<{}> = ({ children }) => {
  const backgroundImage = process.env.BG_DASHBOARD_URL
    ? `url("${process.env.BG_DASHBOARD_URL}")`
    : null;

  return (
    <div className="layout-main" style={{ backgroundImage }}>
      <NavBar />
      {children}
    </div>
  );
};

export default MainLayout;
