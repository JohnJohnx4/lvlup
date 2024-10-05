import { Button, Text } from "@mantine/core";
import styles from "./Header.module.css";
import { useAuth0 } from "@auth0/auth0-react";

export const Header = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <div className={styles.root}>
      <Text size="lg" fw="700">
        LvlUp
      </Text>
      {isAuthenticated ? (
        <Button onClick={() => logout()}>Logout</Button>
      ) : (
        <Button onClick={() => loginWithRedirect()}>Login </Button>
      )}
    </div>
  );
};
