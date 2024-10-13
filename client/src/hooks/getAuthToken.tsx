// src/hooks/useAuthToken.ts
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const useAuthToken = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setToken(token);
      } catch (error) {
        console.error("Error fetching token:", error);
        setToken(null);
      }
    };

    fetchToken();
  }, [getAccessTokenSilently]);

  return token;
};
