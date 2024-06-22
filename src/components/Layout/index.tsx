import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useMe, useTheme } from "../../store/store";
import Start from "../../pages/Start";

const Layout = () => {
  const { loggedIn } = useMe();
  const { theme } = useTheme();

  if (loggedIn) {
    return (
      <main
        className={`${
          theme === "dark" ? "bg-[#080F25] text-white/70 " : ""
        } border-white/10`}
      >
        <Header />
        <section className="w-full h-[calc(100vh-70px)] flex flex-col justify-center items-center">
          <Outlet />
        </section>
      </main>
    );
  } else {
    return <Start />;
  }
};

export default Layout;
