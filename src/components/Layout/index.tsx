import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "../../store/store";

const Layout = () => {
  const { theme } = useTheme();
  return (
    <main
      className={`${
        theme === "dark"
          ? "bg-gradient-to-br from-[#327074] via-[#2a4e7d] to-[#22264C] text-white/70 "
          : ""
      } border-white/10`}
    >
      <Header />
      <section className="w-full h-[calc(100vh-70px)] flex flex-col justify-center items-center">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
