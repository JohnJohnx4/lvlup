import { CourseDTO } from "src/types/courseTypes";

export const courseMock = {
  id: "1",
  title: "Norway Fjord Adventures",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
  badge: "New",
  description:
    "With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway",
  buttonText: "Book classic tour now",
  href: "/courses/1",
  dueDate: new Date(),
  assignedDate: new Date(),
};

export const getRandomDate = (dayOffset: number = 30) => {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * dayOffset) + 1;
  today.setDate(today.getDate() + randomDays);
  return today;
};

export const getCourseArray = (
  courses: CourseDTO[],
  sortByDueDate: boolean = false
) => {
  const coursesArray = courses.map((course, i) => ({
    ...courseMock,
    ...course,
    dueDate: getRandomDate(),
    assignedDate: getRandomDate(-30),
  }));

  if (sortByDueDate) {
    return coursesArray.sort(
      (a, b) => a.dueDate.getTime() - b.dueDate.getTime()
    );
  }

  return coursesArray;
};

export const getMappedCourse = (course: CourseDTO) => ({
  ...courseMock,
  ...course,
  dueDate: getRandomDate(),
  assignedDate: getRandomDate(-30),
});
