import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      <Header />
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
