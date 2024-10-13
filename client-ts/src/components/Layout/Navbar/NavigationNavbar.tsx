import { AppShell, NavLink } from "@mantine/core";
import { routes } from "src/router";
import { AdminDropdown } from "../AdminDropdown";

export const Navigation = () => {
  return (
    <AppShell.Navbar>
      <AdminDropdown />
      {routes.map((route) => (
        <NavLink
          href={route.path}
          label={route.name}
          key={`navbar-item-${route.id}`}
        />
      ))}
    </AppShell.Navbar>
  );
};
