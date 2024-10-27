import { CourseDTO } from "src/types/courseTypes";
import Video1 from "src/assets/video1.mp4";
import Document1 from "src/assets/document.pdf";

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

const textModule = {
  id: "1",
  title: "Module Title 1",
  description: "Module Description 1",
  type: "text",
  content: `
  Learning module software is a versatile tool designed to facilitate educational processes through the use of structured, interactive content. At its core, this software allows educators to create, manage, and deliver learning modules that can be customized to meet specific educational goals. These modules typically include various types of content, such as text, images, videos, quizzes, and interactive activities, making the learning experience engaging and effective.
  \nThe first step in using learning module software involves content creation. Educators can design modules tailored to their curriculum by uploading existing materials or creating new content directly within the software. Many platforms offer user-friendly interfaces, enabling teachers to organize information into coherent units. Features like drag-and-drop functionality simplify the process, allowing for the easy integration of multimedia elements that cater to diverse learning styles.
  \nOnce the content is created, the software provides tools for structuring the module. This can include setting learning objectives, defining assessment criteria, and organizing the content into logical sequences. Educators can incorporate various instructional strategies, such as scaffolding, to guide learners through increasingly complex topics. This thoughtful organization helps students build on their knowledge progressively, leading to deeper understanding and retention of the material.
  \nAssessment is a critical component of any learning module, and most software includes built-in tools for creating quizzes and tests. These assessments can be designed to evaluate different levels of understanding, from basic recall to higher-order thinking skills. Instant feedback features allow students to see their results immediately, promoting a more dynamic learning experience. Additionally, educators can track student performance through analytics provided by the software, identifying areas where learners may need additional support.
  \nCollaboration is another key aspect of learning module software. Many platforms offer features that enable students to work together on projects, engage in discussions, and share resources. This collaborative environment fosters communication and teamwork skills, which are essential in today’s interconnected world. Educators can facilitate group activities and monitor student interactions, ensuring that all learners are actively participating.
  \nLearning module software often includes options for personalization, allowing students to navigate content at their own pace. This flexibility is particularly beneficial for diverse classrooms, where students may have varying levels of ability and interest. Learners can choose to revisit modules, explore supplementary materials, or engage with interactive content based on their individual needs, promoting a more personalized learning experience.
  \nMoreover, many learning module platforms are designed to be accessible across devices, from desktop computers to tablets and smartphones. This accessibility ensures that students can engage with the material anytime and anywhere, supporting a blended learning environment. By breaking down barriers to access, educators can reach a wider audience and accommodate learners who may need additional resources outside traditional classroom settings.
  \nFinally, ongoing support and updates are essential features of effective learning module software. Many providers offer resources such as training sessions, user forums, and customer support to assist educators in maximizing the software’s potential. Continuous updates ensure that the platform evolves alongside educational best practices and technological advancements, keeping the learning experience relevant and impactful. Through this comprehensive approach, learning module software not only enhances educational delivery but also empowers both educators and students in their learning journeys.
  `,
};

const imageModule = {
  id: "2",
  title: "Module Title 2",
  description: "Module Description 2",
  type: "image",
  content:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
};

const videoModule = {
  id: "3",
  title: "Module Title 2",
  description: "Module Description 2",
  type: "video",
  content: Video1,
};

const documentModule = {
  id: "4",
  title: "Module Title 4",
  description: "Module Description 4",
  type: "document",
  content: Document1,
};

export const mockSections = [
  {
    id: "1",
    title: "Section 1",
    description: "Section 1 description",
    modules: [textModule],
  },
  {
    id: "2",
    title: "Section 2",
    description: "Section 2 description",
    modules: [textModule, imageModule],
  },
  {
    id: "3",
    title: "Section 3",
    description: "Section 3 description",
    modules: [textModule, imageModule, videoModule],
  },
  {
    id: "4",
    title: "Section 4",
    description: "Section 4 description",
    modules: [textModule, imageModule, videoModule, documentModule],
  },
];

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
