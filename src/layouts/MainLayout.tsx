import React from "react";
import NavBar from "@components/Navigation/NavBar";
import { version } from "../../package.json";

interface Props {
  children: JSX.Element;
}

const MainLayout: React.FC<Props> = ({ children }) => (
  <div className="layout-main">
    <NavBar />
    {children}
    <footer className="footer-app-version">
      App version: {version ? version : "n/a"}
    </footer>
  </div>
);

export default MainLayout;
