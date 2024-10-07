import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { withLayout } from "src/hooks/withLayout";
import { Text } from "@mantine/core";
import styles from "./index.module.css";

const ProfileScreen = () => {
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = import.meta.env.VITE_AUTH0_DOMAIN;

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();
        console.log("User metadata:", user_metadata);
        setUserMetadata({ ...user_metadata, accessToken });
      } catch (e: any) {
        console.log(e.message);
      }
    };

    if (user?.sub) {
      console.log("Getting user metadata...", user);
      getUserMetadata();
    }
  }, [getAccessTokenWithPopup, user?.sub]);

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
          {userMetadata ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          ) : (
            "Looking for user metadata..."
          )}
        </>
      )}
    </div>
  );
};

export const Profile = withLayout(ProfileScreen);
