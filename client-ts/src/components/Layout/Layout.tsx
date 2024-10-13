// import { useAuth0 } from "@auth0/auth0-react";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navigation } from "./Navbar/NavigationNavbar";
// import { useUserContext } from "src/context/UserContext";

interface LayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
  hideHeader?: boolean;
}

export function Layout({ children }: LayoutProps) {
  const NAVBAR_WIDTH = 200;
  // const { user, isAuthenticated } = useAuth0();
  // const { userMetadata } = useUserContext();

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      p={"32px 64px"}
      header={{ height: 60 }}
      navbar={{
        width: NAVBAR_WIDTH,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
          alignItems: "center",
        }}
      >
        <Burger onClick={toggleDesktop} visibleFrom="sm" />
        <Burger onClick={toggleMobile} hiddenFrom="sm" />
      </AppShell.Header>
      <Navigation />
      <AppShell.Main id="srdgsrfgwsgerg" mih={"90vh"}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
