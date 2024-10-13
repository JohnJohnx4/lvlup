import { Container } from "components/Details/Container";
import { useNavigate, useParams } from "react-router-dom";
import { withNavLayout } from "src/hooks/withLayout";
import { GET_COURSE, useCourseQuery } from "src/queries/courseQueries";
import { TitleContainer } from "./components/TitleContainer";
import { SectionRow } from "./components/SectionRow";
import { Accordion, Button } from "@mantine/core";
import { showDaysOrLocaleDate } from "src/utils/dateTime";
import { useCourseContext } from "src/context/CourseContext";

export const mockSections = [
  {
    id: "1",
    title: "Section 1",
    description: "Section 1 description",
    modules: [
      {
        id: "1",
        title: "Module Title 1",
        description: "Module Description 1",
        type: "text",
        content: "Module Content 1",
      },
    ],
  },
  {
    id: "2",
    title: "Section 2",
    description: "Section 2 description",
    modules: [
      {
        id: "1",
        title: "Module Title 1",
        description: "Module Description 1",
        type: "text",
        content: "Module Content 1",
      },
      {
        id: "2",
        title: "Module Title 2",
        description: "Module Description 2",
        type: "image",
        content: "imageurl",
      },
    ],
  },
  {
    id: "3",
    title: "Section 3",
    description: "Section 3 description",
    modules: [
      {
        id: "1",
        title: "Module Title 1",
        description: "Module Description 1",
        type: "text",
        content: "Module Content 1",
      },
      {
        id: "2",
        title: "Module Title 2",
        description: "Module Description 2",
        type: "image",
        content: "imageurl",
      },
      {
        id: "2",
        title: "Module Title 2",
        description: "Module Description 2",
        type: "video",
        content: "videourl",
      },
    ],
  },
  {
    id: "4",
    title: "Section 4",
    description: "Section 4 description",
    modules: [
      {
        id: "1",
        title: "Module Title 1",
        description: "Module Description 1",
        type: "text",
        content: "Module Content 1",
      },
      {
        id: "2",
        title: "Module Title 2",
        description: "Module Description 2",
        type: "image",
        content: "imageurl",
      },
    ],
  },
];

const DetailsScreen = () => {
  // get route param ID
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { course } = useCourseQuery(GET_COURSE, { id });
  const { setSelectedCourse } = useCourseContext();

  const handleStartCourse = () => {
    console.log("Starting course");
    if (course?.id) {
      setSelectedCourse(course.id);
      navigate("/course/" + course.id);
    }
  };

  return (
    <div>
      {course && (
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: "1280px",
            gap: "16px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <TitleContainer
              title={course.title}
              description={course.description}
            />

            <Container
              style={{
                flexDirection: "column",
              }}
            >
              <div>
                <h3>{mockSections.length} Sections</h3>
              </div>
              <Accordion>
                {mockSections.map((module) => (
                  <SectionRow section={module} />
                ))}
              </Accordion>
            </Container>
          </div>
          <Container
            style={{
              width: "40%",
              textWrap: "wrap",
              wordWrap: "break-word",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <div>
              <div>{course.badge}</div>
              <img width={"100%"} height="auto" src={course.image} />
              <div>Due {showDaysOrLocaleDate(course.dueDate)}</div>
              <div>Assigned on {course.assignedDate?.toLocaleDateString()}</div>
              <div>Time to complete: 15 mins</div>
            </div>
            <Button onClick={handleStartCourse}>{"\u25B6"} Start Course</Button>
          </Container>
        </div>
      )}
    </div>
  );
};

export const CourseDetails = withNavLayout(DetailsScreen);
