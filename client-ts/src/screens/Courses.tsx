import { CourseCard } from "components/Course/CourseCard";
import { withLayout } from "src/hooks/withLayout";
import { courseMock } from "src/utils/mocks/courseMock";
import styles from "./index.module.css";

const CoursesScreen = () => {
  const courses = new Array(10)
    .fill(0)
    .map((_, i) => ({ ...courseMock, id: "course-card-" + (i + 1) }));
  return (
    <div className={styles.root}>
      <div>Courses</div>
      <div className={styles["course-cards"]}>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export const Courses = withLayout(CoursesScreen);
