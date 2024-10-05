import { CourseCard, CourseProps } from "components/Course/CourseCard";

interface CourseContainerProps {
  courses: CourseProps[];
  includeWrapper?: boolean;
}
export const CourseContainer = ({
  courses,
  includeWrapper,
}: CourseContainerProps) => {
  if (includeWrapper) {
    return (
      <div>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    );
  }

  return (
    <>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </>
  );
};
