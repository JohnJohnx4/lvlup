import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const Authentication = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    logout,
    loginWithRedirect,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      console.log("User is no logged in, logging in...");
      loginWithRedirect();
    }
  }, [user, isAuthenticated, isLoading]);

  return <div>Authentication</div>;
};
