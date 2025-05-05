
import { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

const Layout = ({ children, hideNavbar = false, hideFooter = false }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <NavBar />}
      <main className="flex-grow pt-16">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
