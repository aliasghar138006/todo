import Link from "next/link";
import React from "react";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Layout({ children }) {
  const { status } = useSession();
  const router = useRouter();

  const logoutHandler = () => {
    signOut();
    router.replace("/signin");
  };
  return (
    <div className="container">
      <header>
        <p>Todo Project | Next.js</p>
        {status == "authenticated" && (
          <div style={{ cursor: "pointer" }} onClick={logoutHandler}>
            LogOut
          </div>
        )}
      </header>
      <div className="container--main">
        <aside>
          <div style={{ display: "flex" }}>
            <p>welcome</p>
            <p>👋</p>
          </div>
          <ul>
            <li>
              <VscListSelection />
              <Link href="/">Todos</Link>
            </li>
            <li>
              <BiMessageSquareAdd />
              <Link href="/add-todo">Add Todo</Link>
            </li>
            <li>
              <RxDashboard />
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}

export default Layout;
