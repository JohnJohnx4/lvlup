import { Navbar } from "components/Navbar/Navbar";
import { Header } from "components/Header/Header";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
  hideHeader?: boolean;
}

export const Layout = ({
  children,
  hideHeader = false,
  hideNavbar = false,
}: LayoutProps) => {
  return (
    <div className={styles.root}>
      {!hideHeader && <Header />}
      <div className={styles.container}>
        {!hideNavbar && <Navbar />}
        {children}
      </div>
    </div>
  );
};
