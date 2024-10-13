import { createContext, useContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";

// Create the context
const DataContext = createContext<any>(null);

// Create a provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
  } = useAuth0();

  const [userMetadata, setUserMetadata] = useState<{
    user: any;
    app: any;
    token: string;
  } | null>(null);

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

        const { user_metadata, app_metadata } = await metadataResponse.json();
        console.log("User metadata:", user_metadata, app_metadata);
        setUserMetadata({
          user: user_metadata,
          app: app_metadata,
          token: accessToken,
        });
      } catch (e: any) {
        console.log(e.message);
      }
    };

    if (isAuthenticated && user?.sub) {
      console.log("Getting user metadata...", user);
      getUserMetadata();
    }
  }, [getAccessTokenWithPopup, user?.sub]);

  return (
    <DataContext.Provider value={{ userMetadata }}>
      {children}
    </DataContext.Provider>
  );
};

// Create a custom hook for easier access to the context
export const useUserContext = () => {
  return useContext(DataContext);
};
