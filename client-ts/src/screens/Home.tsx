import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { withLayout } from "src/hooks/withLayout";
import styles from "./index.module.css";

const HomeScreen = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      console.log("User is no logged in, logging in...");
      loginWithRedirect();
    }
  }, [user, isAuthenticated, isLoading]);

  return (
    <div className={styles.root}>
      <div>Overview</div>
      <div>
        <div>In Progress</div>
      </div>
      <div>
        <div>Past Due</div>
      </div>
      <div>
        <div>Assigned Courses</div>
      </div>
    </div>
  );
};

export const Home = withLayout(HomeScreen);
