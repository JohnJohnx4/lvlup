import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export const Authentication = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      console.log("User is no logged in, logging in...");
      loginWithRedirect();
    }
  }, [user, isAuthenticated, isLoading]);

  return <div>Authentication</div>;
};
