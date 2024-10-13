import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { withNavLayout } from "src/hooks/withLayout";
import { Text } from "@mantine/core";
import styles from "./index.module.css";
import { useUserContext } from "src/context/UserContext";

const ProfileScreen = () => {
  const { user, isAuthenticated } = useAuth0();
  const { userMetadata } = useUserContext();

  return (
    <div className={styles.root}>
      <Text size="xl">Profile</Text>
      {isAuthenticated && user && (
        <>
          <img
            className={styles["avatar-thumbnail"]}
            src={user.picture}
            alt={user.name}
          />
          <h2>Name: {user.name}</h2>
          <p>Email: {user.email}</p>
          <h3>User Metadata</h3>
          {userMetadata?.user ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          ) : (
            "Looking for user metadata..."
          )}
        </>
      )}
    </div>
  );
};

export const Profile = withNavLayout(ProfileScreen);
