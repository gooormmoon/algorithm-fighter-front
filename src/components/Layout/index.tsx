import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      <Header />
      <section className="w-full h-[calc(100vh-70px)] flex flex-col justify-center items-center">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
