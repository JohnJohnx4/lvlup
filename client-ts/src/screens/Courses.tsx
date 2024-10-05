import { withLayout } from "src/hooks/withLayout";
import { getCourseArray } from "src/utils/mocks/courseMock";
import styles from "./index.module.css";
import { CourseContainer } from "components/CourseContainer/CourseContainer";

const CoursesScreen = () => {
  const courses = getCourseArray(5);

  return (
    <div className={styles.root}>
      <div>Courses</div>
      <div>Assigned</div>
      <div className={styles["course-cards"]}>
        <CourseContainer courses={courses} />
      </div>
    </div>
  );
};

export const Courses = withLayout(CoursesScreen);
