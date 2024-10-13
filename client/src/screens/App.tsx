import { Container } from "components/Container";
import { Layout } from "components/Layout/Layout";
import { Text } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const App = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/home");
  }

  return (
    <Layout hideNavbar>
      <Container>
        <div>
          <Text>LvlUp</Text>
          <Text>Level up company onboarding, training, and more</Text>
        </div>
      </Container>
    </Layout>
  );
};
