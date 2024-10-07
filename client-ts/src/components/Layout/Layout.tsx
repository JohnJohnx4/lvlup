import { AppShell, Burger, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { routes } from "src/router";

interface LayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
  hideHeader?: boolean;
}

export function Layout({ children }: LayoutProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
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
      <AppShell.Navbar>
        {routes.map((route) => (
          <NavLink
            href={route.path}
            label={route.name}
            key={`navbar-item-${route.id}`}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
