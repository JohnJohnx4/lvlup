import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import client from "./apolloClient"; // Import the Apollo Client

import "@mantine/core/styles.css";
import { router } from "./router.tsx";
import { ApolloProvider } from "@apollo/client";
import { CourseProvider } from "./context/CourseContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN || ""}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || ""}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/home`,
        audience: "https://lvlup-test",
      }}
      onRedirectCallback={(param) => console.log("Redirect Callback", param)}
    >
      <MantineProvider>
        <ApolloProvider client={client}>
          <UserProvider>
            <CourseProvider>
              <RouterProvider router={router} />
            </CourseProvider>
          </UserProvider>
        </ApolloProvider>
      </MantineProvider>
    </Auth0Provider>
  </StrictMode>
);
