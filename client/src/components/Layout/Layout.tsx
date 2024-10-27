// import { useAuth0 } from "@auth0/auth0-react";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavigationNavbar } from "./Navbar/NavigationNavbar";
import { CourseNavbar } from "./Navbar/CourseNavbar";
// import { useUserContext } from "src/context/UserContext";

interface LayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
  hideHeader?: boolean;
  courseNavbar?: boolean;
}

export function Layout({ children, courseNavbar }: LayoutProps) {
  const NAVBAR_WIDTH = 260;
  // const { user, isAuthenticated } = useAuth0();
  // const { userMetadata } = useUserContext();

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      p={"32px 64px"}
      header={{ height: 60 }}
      h={"100%"}
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
      {courseNavbar ? <CourseNavbar /> : <NavigationNavbar />}
      <AppShell.Main mih={"90vh"} h={"100"}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
