export const courseMock = {
  id: "1",
  title: "Norway Fjord Adventures",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
  badge: "On Sale",
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
  length: number,
  sortByDueDate: boolean = false
) => {
  const coursesArray = new Array(length).fill(0).map((_, i) => ({
    ...courseMock,
    id: "course-card-" + (i + 1),
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
