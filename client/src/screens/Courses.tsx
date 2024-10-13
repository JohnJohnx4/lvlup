import { withNavLayout } from "src/hooks/withLayout";
import styles from "./index.module.css";
import { CourseContainer } from "components/CourseContainer/CourseContainer";
import { GET_COURSES, useCourseQuery } from "src/queries/courseQueries";

const CoursesScreen = () => {
  const { loading, error, courses } = useCourseQuery(GET_COURSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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

export const Courses = withNavLayout(CoursesScreen);
