import { Button, NavLink, Text } from "@mantine/core";
import styles from "./Navbar.module.css";
import { routes } from "src/router";

export const Navbar = () => {
  return (
    <div className={styles.root}>
      <Text className={styles.title} fw="700">
        Navigation
      </Text>
      <div className={styles.container}>
        {routes.map((route) => (
          <NavLink
            href={route.path}
            label={route.name}
            key={`navbar-item-${route.id}`}
          />
        ))}
      </div>
    </div>
  );
};
