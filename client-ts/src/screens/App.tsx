import { Container } from "components/Container";
import { Layout } from "components/Layout/Layout";
import { Text } from "@mantine/core";

export const App = () => {
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
