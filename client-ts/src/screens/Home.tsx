import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { withLayout } from "src/hooks/withLayout";
import styles from "./index.module.css";
import { CourseContainer } from "components/CourseContainer/CourseContainer";
import { getCourseArray } from "src/utils/mocks/courseMock";

const HomeScreen = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const inProgressCourses = getCourseArray(3, true);
  const pastDueCourses = getCourseArray(2, true);
  const assignedCourses = getCourseArray(10, true);

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
        <div
          style={{
            margin: "24px 0 16px",
          }}
        >
          In Progress
        </div>
        <div className={styles["course-cards"]}>
          <CourseContainer courses={inProgressCourses} />
        </div>
      </div>
      <div>
        <div
          style={{
            margin: "24px 0 16px",
          }}
        >
          Past Due
        </div>
        <div className={styles["course-cards"]}>
          <CourseContainer courses={pastDueCourses} />
        </div>
      </div>
      <div>
        <div
          style={{
            margin: "24px 0 16px",
          }}
        >
          Assigned Courses
        </div>
        <div className={styles["course-cards"]}>
          <CourseContainer courses={assignedCourses} />
        </div>
      </div>
    </div>
  );
};

export const Home = withLayout(HomeScreen);
